import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Hall from './hall.js'
import User from './user.js'
import Booking from './booking.js'
import ReviewPhoto from './review_photo.js'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hallId: number

  @column()
  declare userId: number

  @column()
  declare bookingId: number | null

  // Ratings
  @column()
  declare rating: number

  @column()
  declare reviewText: string | null

  // Detailed ratings
  @column()
  declare cleanlinessRating: number | null

  @column()
  declare serviceRating: number | null

  @column()
  declare valueRating: number | null

  @column()
  declare locationRating: number | null

  // Moderation
  @column()
  declare isVerified: boolean

  @column()
  declare isApproved: boolean

  @column()
  declare isReported: boolean

  // Business response
  @column()
  declare businessResponse: string | null

  @column.dateTime()
  declare businessRespondedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Hall)
  declare hall: BelongsTo<typeof Hall>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>

  @hasMany(() => ReviewPhoto)
  declare photos: HasMany<typeof ReviewPhoto>
}
