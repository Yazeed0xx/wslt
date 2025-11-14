import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Hall from './hall.js'
import User from './user.js'
import Payment from './payment.js'
import Review from './review.js'
import BlockedDate from './blocked_date.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingNumber: string

  @column()
  declare hallId: number

  @column()
  declare customerId: number

  // Event details
  @column.date()
  declare eventDate: DateTime

  @column()
  declare startTime: string

  @column()
  declare endTime: string

  @column()
  declare guestCount: number

  @column()
  declare eventType: 'WEDDING' | 'ENGAGEMENT' | 'BIRTHDAY' | 'CORPORATE' | 'OTHER'

  @column()
  declare specialRequests: string | null

  // Contact info
  @column()
  declare contactName: string

  @column()
  declare contactPhone: string

  @column()
  declare contactEmail: string | null

  // Pricing
  @column()
  declare basePrice: number

  @column()
  declare servicesCost: number

  @column()
  declare totalAmount: number

  @column()
  declare depositPaid: number

  @column()
  declare remainingAmount: number

  // Status
  @column()
  declare status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'COMPLETED' | 'CANCELLED' | 'REJECTED'

  @column()
  declare cancelledBy: 'CUSTOMER' | 'BUSINESS' | null

  @column()
  declare cancellationReason: string | null

  @column.dateTime()
  declare cancelledAt: DateTime | null

  @column.dateTime()
  declare confirmedAt: DateTime | null

  @column.dateTime()
  declare paidAt: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Hall)
  declare hall: BelongsTo<typeof Hall>

  @belongsTo(() => User, {
    foreignKey: 'customerId'
  })
  declare customer: BelongsTo<typeof User>

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>

  @hasOne(() => Review)
  declare review: HasOne<typeof Review>

  @hasMany(() => BlockedDate)
  declare blockedDates: HasMany<typeof BlockedDate>
}
