import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import HallPhoto from './hall_photo.js'
import Amenity from './amenity.js'
import Booking from './booking.js'
import Review from './review.js'
import BlockedDate from './blocked_date.js'
import Favorite from './favorite.js'

export default class Hall extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ownerId: number

  // Basic info
  @column()
  declare name: string

  @column()
  declare description: string | null

  // Location
  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare district: string | null

  @column()
  declare latitude: number | null

  @column()
  declare longitude: number | null

  // Capacity
  @column()
  declare minCapacity: number

  @column()
  declare maxCapacity: number

  // Pricing
  @column()
  declare basePrice: number

  @column()
  declare pricePerPerson: number | null

  @column()
  declare depositAmount: number

  @column()
  declare depositType: 'FIXED' | 'PERCENTAGE'

  // Hall type and category
  @column()
  declare hallType: 'INDOOR' | 'OUTDOOR' | 'MIXED'

  @column()
  declare hallCategory: 'LUXURY' | 'STANDARD' | 'BUDGET'

  // Status
  @column()
  declare status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'

  // Policies
  @column()
  declare minBookingNoticeDays: number

  @column()
  declare maxBookingDurationHours: number

  @column()
  declare bufferTimeHours: number

  @column()
  declare cancellationPolicy: string | null

  // SEO/Search
  @column()
  declare averageRating: number

  @column()
  declare totalReviews: number

  @column()
  declare totalBookings: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  // Relationships
  @belongsTo(() => User, {
    foreignKey: 'ownerId'
  })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => HallPhoto)
  declare photos: HasMany<typeof HallPhoto>

  @manyToMany(() => Amenity, {
    pivotTable: 'hall_amenities',
    pivotColumns: ['additional_cost', 'is_included'],
  })
  declare amenities: ManyToMany<typeof Amenity>

  @hasMany(() => Booking)
  declare bookings: HasMany<typeof Booking>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @hasMany(() => BlockedDate)
  declare blockedDates: HasMany<typeof BlockedDate>

  @hasMany(() => Favorite)
  declare favorites: HasMany<typeof Favorite>
}
