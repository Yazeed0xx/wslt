import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Review from './review.js'

export default class ReviewPhoto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reviewId: number

  @column()
  declare photoUrl: string

  @column()
  declare thumbnailUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships
  @belongsTo(() => Review)
  declare review: BelongsTo<typeof Review>
}
