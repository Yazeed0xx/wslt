import Factory from '@adonisjs/lucid/factories'
import Booking from '#models/booking'
import { DateTime } from 'luxon'

export const BookingFactory = Factory.define(Booking, ({ faker }) => {
  const eventDate = DateTime.now().plus({ days: faker.number.int({ min: 30, max: 180 }) })
  const basePrice = faker.number.int({ min: 10000, max: 80000 })
  const guestCount = faker.number.int({ min: 100, max: 500 })

  return {
    bookingNumber: `BK${DateTime.now().toFormat('yyyyMMdd')}${faker.string.numeric(6)}`,
    eventDate: eventDate,
    startTime: '18:00',
    endTime: '23:00',
    guestCount: guestCount,
    eventType: faker.helpers.arrayElement([
      'WEDDING',
      'ENGAGEMENT',
      'BIRTHDAY',
      'CORPORATE',
      'OTHER',
    ] as const),
    specialRequests: faker.lorem.sentence(),
    contactName: faker.person.fullName(),
    contactPhone: `+9665${faker.string.numeric(8)}`,
    contactEmail: faker.internet.email(),
    basePrice: basePrice,
    servicesCost: faker.number.int({ min: 0, max: 5000 }),
    totalAmount: basePrice + faker.number.int({ min: 0, max: 5000 }),
    depositPaid: 0,
    remainingAmount: basePrice,
    status: faker.helpers.arrayElement([
      'PENDING',
      'CONFIRMED',
      'COMPLETED',
      'CANCELLED',
    ] as const),
  }
})
  .state('confirmed', (booking) => {
    booking.status = 'CONFIRMED'
    booking.confirmedAt = DateTime.now().minus({ days: 20 })
  })
  .state('completed', (booking) => {
    booking.status = 'COMPLETED'
    booking.confirmedAt = DateTime.now().minus({ days: 30 })
    booking.completedAt = DateTime.now().minus({ days: 5 })
  })
  .state('cancelled', (booking, { faker }) => {
    booking.status = 'CANCELLED'
    booking.cancelledAt = DateTime.now().minus({ days: 10 })
    booking.cancelledBy = faker.helpers.arrayElement(['CUSTOMER', 'BUSINESS'] as const)
    booking.cancellationReason = faker.lorem.sentence()
  })
  .build()

