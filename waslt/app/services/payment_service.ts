import Payment from '#models/payment'
import Booking from '#models/booking'
import { moyasarConfig } from '#config/moyasar'
import { DateTime } from 'luxon'

const moyasar = require('moyasar')

/**
 * PaymentService
 * 
 * Handles all payment operations through Moyasar gateway
 */
export class PaymentService {
  private moyasarClient: any

  constructor() {
    // Initialize Moyasar client
    this.moyasarClient = moyasar(moyasarConfig.apiKey)
  }

  /**
   * Create a payment intent for a booking deposit
   */
  async createDepositPayment(bookingId: number, userId: number) {
    const booking = await Booking.query()
      .where('id', bookingId)
      .where('customer_id', userId)
      .preload('hall')
      .firstOrFail()

    // Amount in halalas (1 SAR = 100 halalas)
    const amountInHalalas = Math.round(booking.depositPaid * 100)

    // Create payment record
    const payment = await Payment.create({
      bookingId: booking.id,
      userId: userId,
      amount: booking.depositPaid,
      paymentType: 'DEPOSIT',
      status: 'PENDING',
      gatewayName: 'MOYASAR',
    })

    // Create Moyasar payment
    try {
      const moyasarPayment = await this.moyasarClient.payment.create({
        amount: amountInHalalas,
        currency: moyasarConfig.currency,
        description: `Deposit for ${booking.hall.name} - Booking #${booking.bookingNumber}`,
        callback_url: `${moyasarConfig.callbackUrl}?payment_id=${payment.id}`,
        source: {
          type: 'creditcard', // Can be 'creditcard', 'applepay', 'stcpay'
        },
        metadata: {
          booking_id: booking.id,
          payment_id: payment.id,
          user_id: userId,
          payment_type: 'DEPOSIT',
        },
      })

      // Update payment with Moyasar transaction ID
      payment.transactionId = moyasarPayment.id
      payment.paymentReference = `MOY-${moyasarPayment.id}`
      await payment.save()

      return {
        payment,
        moyasarPayment,
        checkoutUrl: moyasarPayment.source.transaction_url,
      }
    } catch (error) {
      // Update payment status to failed
      payment.status = 'FAILED'
      payment.gatewayResponse = JSON.stringify(error)
      await payment.save()

      throw new Error(`Failed to create payment: ${error.message}`)
    }
  }

  /**
   * Create a payment for remaining amount
   */
  async createRemainingPayment(bookingId: number, userId: number) {
    const booking = await Booking.query()
      .where('id', bookingId)
      .where('customer_id', userId)
      .preload('hall')
      .firstOrFail()

    // Amount in halalas
    const amountInHalalas = Math.round(booking.remainingAmount * 100)

    // Create payment record
    const payment = await Payment.create({
      bookingId: booking.id,
      userId: userId,
      amount: booking.remainingAmount,
      paymentType: 'REMAINING',
      status: 'PENDING',
      gatewayName: 'MOYASAR',
    })

    try {
      const moyasarPayment = await this.moyasarClient.payment.create({
        amount: amountInHalalas,
        currency: moyasarConfig.currency,
        description: `Remaining payment for ${booking.hall.name} - Booking #${booking.bookingNumber}`,
        callback_url: `${moyasarConfig.callbackUrl}?payment_id=${payment.id}`,
        source: {
          type: 'creditcard',
        },
        metadata: {
          booking_id: booking.id,
          payment_id: payment.id,
          user_id: userId,
          payment_type: 'REMAINING',
        },
      })

      payment.transactionId = moyasarPayment.id
      payment.paymentReference = `MOY-${moyasarPayment.id}`
      await payment.save()

      return {
        payment,
        moyasarPayment,
        checkoutUrl: moyasarPayment.source.transaction_url,
      }
    } catch (error) {
      payment.status = 'FAILED'
      payment.gatewayResponse = JSON.stringify(error)
      await payment.save()

      throw new Error(`Failed to create payment: ${error.message}`)
    }
  }

  /**
   * Process refund for cancelled booking
   */
  async processRefund(paymentId: number, amount: number, reason: string) {
    const payment = await Payment.findOrFail(paymentId)

    if (payment.status !== 'COMPLETED') {
      throw new Error('Can only refund completed payments')
    }

    try {
      const refund = await this.moyasarClient.refund.create({
        payment_id: payment.transactionId,
        amount: Math.round(amount * 100), // Amount in halalas
        description: reason,
      })

      // Create refund payment record
      const refundPayment = await Payment.create({
        bookingId: payment.bookingId,
        userId: payment.userId,
        amount: -amount, // Negative amount for refund
        paymentType: 'REFUND',
        paymentMethod: payment.paymentMethod,
        status: 'COMPLETED',
        gatewayName: 'MOYASAR',
        transactionId: refund.id,
        paymentReference: `REF-${refund.id}`,
        notes: reason,
        processedAt: DateTime.now(),
      })

      return refundPayment
    } catch (error) {
      throw new Error(`Failed to process refund: ${error.message}`)
    }
  }

  /**
   * Handle Moyasar webhook callback
   */
  async handleWebhook(webhookData: any) {
    const { type, data } = webhookData

    if (type === 'payment_paid') {
      return await this.handlePaymentSuccess(data)
    } else if (type === 'payment_failed') {
      return await this.handlePaymentFailed(data)
    }

    return { status: 'ignored', message: 'Webhook type not handled' }
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSuccess(moyasarPayment: any) {
    const paymentId = moyasarPayment.metadata?.payment_id

    if (!paymentId) {
      throw new Error('Payment ID not found in metadata')
    }

    const payment = await Payment.query()
      .where('id', paymentId)
      .preload('booking')
      .firstOrFail()

    // Update payment status
    payment.status = 'COMPLETED'
    payment.paymentMethod = moyasarPayment.source.type.toUpperCase()
    payment.gatewayResponse = JSON.stringify(moyasarPayment)
    payment.processedAt = DateTime.now()
    await payment.save()

    // Update booking status
    const booking = payment.booking

    if (payment.paymentType === 'DEPOSIT') {
      booking.status = 'CONFIRMED'
      booking.confirmedAt = DateTime.now()
    } else if (payment.paymentType === 'REMAINING') {
      booking.paidAt = DateTime.now()
    }

    await booking.save()

    return { status: 'success', payment, booking }
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(moyasarPayment: any) {
    const paymentId = moyasarPayment.metadata?.payment_id

    if (!paymentId) {
      throw new Error('Payment ID not found in metadata')
    }

    const payment = await Payment.findOrFail(paymentId)

    // Update payment status
    payment.status = 'FAILED'
    payment.gatewayResponse = JSON.stringify(moyasarPayment)
    await payment.save()

    return { status: 'failed', payment }
  }

  /**
   * Get payment status from Moyasar
   */
  async getPaymentStatus(transactionId: string) {
    try {
      const moyasarPayment = await this.moyasarClient.payment.fetch(transactionId)
      return {
        status: moyasarPayment.status,
        amount: moyasarPayment.amount / 100, // Convert from halalas to SAR
        currency: moyasarPayment.currency,
        paymentMethod: moyasarPayment.source.type,
      }
    } catch (error) {
      throw new Error(`Failed to fetch payment status: ${error.message}`)
    }
  }

  /**
   * Get publishable key for mobile app
   */
  getPublishableKey() {
    return moyasarConfig.publishableKey
  }
}

