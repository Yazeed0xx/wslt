import Factory from '@adonisjs/lucid/factories'
import Payment from '#models/payment'
import { DateTime } from 'luxon'

export const PaymentFactory = Factory.define(Payment, ({ faker }) => {
  const amount = faker.number.int({ min: 1000, max: 30000 })

  return {
    amount: amount,
    paymentType: faker.helpers.arrayElement(['DEPOSIT', 'FULL_PAYMENT', 'REMAINING'] as const),
    paymentMethod: faker.helpers.arrayElement([
      'CREDIT_CARD',
      'DEBIT_CARD',
      'BANK_TRANSFER',
      'CASH',
      'MADA',
    ] as const),
    status: 'COMPLETED' as const,
    transactionId: faker.string.alphanumeric(20).toUpperCase(),
    paymentGateway: faker.helpers.arrayElement(['STRIPE', 'PAYPAL', 'HYPERPAY', 'MOYASAR']),
    gatewayResponse: JSON.stringify({ success: true }),
    paidAt: DateTime.now(),
  }
}).build()

