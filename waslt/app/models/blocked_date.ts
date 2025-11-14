import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Hall from './hall.js'
import Booking from './booking.js'

export default class BlockedDate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hallId: number

  @column.date()
  declare blockedDate: DateTime

  @column()
  declare reason: 'BOOKED' | 'MAINTENANCE' | 'OWNER_BLOCKED' | 'HOLIDAY'

  @column()
  declare notes: string | null

  @column()
  declare bookingId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships
  @belongsTo(() => Hall)
  declare hall: BelongsTo<typeof Hall>

  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>
}
