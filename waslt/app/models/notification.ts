import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare body: string

  @column()
  declare type: 
    | 'BOOKING_CREATED'
    | 'BOOKING_CONFIRMED'
    | 'BOOKING_CANCELLED'
    | 'BOOKING_REJECTED'
    | 'PAYMENT_SUCCESS'
    | 'PAYMENT_FAILED'
    | 'REVIEW_RECEIVED'
    | 'HALL_APPROVED'
    | 'HALL_REJECTED'
    | 'PROMOTION'
    | 'REMINDER'
    | 'OTHER'

  @column()
  declare resourceType: string | null

  @column()
  declare resourceId: number | null

  @column()
  declare data: any | null

  @column()
  declare isRead: boolean

  @column.dateTime()
  declare readAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
