import Factory from '@adonisjs/lucid/factories'
import BlockedDate from '#models/blocked_date'
import { DateTime } from 'luxon'

export const BlockedDateFactory = Factory.define(BlockedDate, ({ faker }) => {
  return {
    blockedDate: DateTime.now().plus({ days: faker.number.int({ min: 1, max: 90 }) }),
    reason: faker.helpers.arrayElement([
      'BOOKED',
      'MAINTENANCE',
      'HOLIDAY',
      'OWNER_BLOCKED',
    ] as const),
    notes: faker.lorem.sentence(),
  }
}).build()

