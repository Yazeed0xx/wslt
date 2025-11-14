import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BookingFactory } from '#database/factories/booking_factory'
import { BlockedDateFactory } from '#database/factories/blocked_date_factory'
import User from '#models/user'
import Hall from '#models/hall'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding bookings...')

    const customers = await User.query().where('role', 'CUSTOMER')
    const halls = await Hall.all()

    if (customers.length === 0 || halls.length === 0) {
      console.log('⚠️  No customers or halls found. Skipping booking seeding.')
      return
    }

    // Create confirmed bookings
    for (let i = 0; i < 10; i++) {
      const customer = customers[i % customers.length]
      const hall = halls[i % halls.length]

      const booking = await BookingFactory.apply('confirmed')
        .merge({
          customerId: customer.id,
          hallId: hall.id,
        })
        .create()

      // Create deposit payment
      await booking.related('payments').create({
        paymentReference: `PAY${Date.now()}${i}`,
        userId: customer.id,
        amount: booking.basePrice * 0.3,
        paymentType: 'DEPOSIT',
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        transactionId: `TXN${Date.now()}${i}`,
        gatewayName: 'STRIPE',
      })

      // Block the date for this booking
      await BlockedDateFactory.merge({
        hallId: hall.id,
        bookingId: booking.id,
        blockedDate: booking.eventDate,
        reason: 'BOOKED' as const,
      }).create()

      console.log(`  ✓ Created confirmed booking: ${booking.bookingNumber}`)
    }

    // Create completed bookings (with possibility of reviews)
    for (let i = 0; i < 8; i++) {
      const customer = customers[i % customers.length]
      const hall = halls[i % halls.length]

      const booking = await BookingFactory.apply('completed')
        .merge({
          customerId: customer.id,
          hallId: hall.id,
        })
        .create()

      // Create deposit and remaining payments
      await booking.related('payments').create({
        paymentReference: `PAY${Date.now()}${i}A`,
        userId: customer.id,
        amount: booking.basePrice * 0.3,
        paymentType: 'DEPOSIT',
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        transactionId: `TXN${Date.now()}${i}A`,
        gatewayName: 'STRIPE',
      })

      await booking.related('payments').create({
        paymentReference: `PAY${Date.now()}${i}B`,
        userId: customer.id,
        amount: booking.basePrice * 0.7,
        paymentType: 'REMAINING',
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        transactionId: `TXN${Date.now()}${i}B`,
        gatewayName: 'STRIPE',
      })
    }

    // Create cancelled bookings
    for (let i = 0; i < 3; i++) {
      const customer = customers[i % customers.length]
      const hall = halls[i % halls.length]

      const booking = await BookingFactory.apply('cancelled')
        .merge({
          customerId: customer.id,
          hallId: hall.id,
        })
        .create()

      // Create deposit payment
      await booking.related('payments').create({
        paymentReference: `PAY${Date.now()}${i}C`,
        userId: customer.id,
        amount: booking.basePrice * 0.3,
        paymentType: 'DEPOSIT',
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        transactionId: `TXN${Date.now()}${i}C`,
        gatewayName: 'STRIPE',
      })
    }

    // Create pending bookings
    for (let i = 0; i < 5; i++) {
      const customer = customers[i % customers.length]
      const hall = halls[i % halls.length]

      await BookingFactory.merge({
        customerId: customer.id,
        hallId: hall.id,
        status: 'PENDING' as const,
      }).create()
    }

    console.log('✅ Bookings seeded successfully!')
  }
}

