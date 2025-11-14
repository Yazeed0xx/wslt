import type { HttpContext } from '@adonisjs/core/http'
import { PaymentService } from '#services/payment_service'

export default class PaymentsController {
  /**
   * Create a deposit payment for a booking
   * POST /api/customer/bookings/:bookingId/payments/deposit
   */
  async createDepositPayment({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const paymentService = new PaymentService()

    try {
      const result = await paymentService.createDepositPayment(params.bookingId, user.id)

      return response.created({
        message: 'Payment created successfully',
        data: {
          payment: result.payment,
          checkoutUrl: result.checkoutUrl,
          transactionId: result.moyasarPayment.id,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }

  /**
   * Create a payment for remaining amount
   * POST /api/customer/bookings/:bookingId/payments/remaining
   */
  async createRemainingPayment({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const paymentService = new PaymentService()

    try {
      const result = await paymentService.createRemainingPayment(params.bookingId, user.id)

      return response.created({
        message: 'Payment created successfully',
        data: {
          payment: result.payment,
          checkoutUrl: result.checkoutUrl,
          transactionId: result.moyasarPayment.id,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }

  /**
   * Get payment status
   * GET /api/customer/payments/:transactionId/status
   */
  async getPaymentStatus({ params, response }: HttpContext) {
    const paymentService = new PaymentService()

    try {
      const status = await paymentService.getPaymentStatus(params.transactionId)

      return response.ok({
        data: status,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }

  /**
   * Get Moyasar publishable key for mobile app
   * GET /api/customer/payments/config
   */
  async getConfig({ response }: HttpContext) {
    const paymentService = new PaymentService()

    return response.ok({
      publishableKey: paymentService.getPublishableKey(),
    })
  }
}
