import Factory from '@adonisjs/lucid/factories'
import Review from '#models/review'
import { DateTime } from 'luxon'

export const ReviewFactory = Factory.define(Review, ({ faker }) => {
  return {
    rating: faker.number.int({ min: 3, max: 5 }),
    reviewText: faker.lorem.paragraph(),
    cleanlinessRating: faker.number.int({ min: 3, max: 5 }),
    serviceRating: faker.number.int({ min: 3, max: 5 }),
    valueRating: faker.number.int({ min: 3, max: 5 }),
    locationRating: faker.number.int({ min: 3, max: 5 }),
    isVerified: true,
    isApproved: true,
    isReported: false,
  }
}).build()

