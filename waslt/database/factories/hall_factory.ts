import Factory from '@adonisjs/lucid/factories'
import Hall from '#models/hall'

export const HallFactory = Factory.define(Hall, ({ faker }) => {
  const basePrice = faker.number.int({ min: 5000, max: 50000 })
  const capacity = faker.number.int({ min: 100, max: 1000 })

  return {
    name: faker.company.name() + ' Hall',
    description: faker.lorem.paragraph(),
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement(['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina']),
    district: faker.location.county(),
    latitude: faker.location.latitude({ min: 24.4, max: 24.9 }),
    longitude: faker.location.longitude({ min: 46.5, max: 47.0 }),
    minCapacity: Math.floor(capacity * 0.5),
    maxCapacity: capacity,
    basePrice: basePrice,
    pricePerPerson: faker.number.int({ min: 50, max: 200 }),
    depositAmount: basePrice * 0.3,
    depositType: 'PERCENTAGE' as const,
    hallType: faker.helpers.arrayElement(['INDOOR', 'OUTDOOR', 'MIXED'] as const),
    hallCategory: faker.helpers.arrayElement(['LUXURY', 'STANDARD', 'BUDGET'] as const),
    status: 'ACTIVE' as const,
    minBookingNoticeDays: faker.number.int({ min: 7, max: 30 }),
    maxBookingDurationHours: faker.number.int({ min: 4, max: 12 }),
    bufferTimeHours: faker.number.int({ min: 2, max: 6 }),
    cancellationPolicy: faker.lorem.sentences(3),
    averageRating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    totalReviews: faker.number.int({ min: 0, max: 100 }),
    totalBookings: faker.number.int({ min: 0, max: 200 }),
  }
}).build()

