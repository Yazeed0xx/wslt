import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Hall from './hall.js'

export default class HallPhoto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hallId: number

  @column()
  declare photoUrl: string

  @column()
  declare thumbnailUrl: string | null

  @column()
  declare photoType: 'MAIN' | 'INTERIOR' | 'EXTERIOR' | 'SETUP' | 'CATERING' | 'OTHER'

  @column()
  declare displayOrder: number

  @column()
  declare isPrimary: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Hall)
  declare hall: BelongsTo<typeof Hall>
}
