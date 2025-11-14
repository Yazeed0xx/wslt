import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Hall from './hall.js'

export default class Amenity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare nameAr: string | null

  @column()
  declare icon: string | null

  @column()
  declare category: 'FACILITIES' | 'SERVICES' | 'ENTERTAINMENT' | 'FOOD'

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @manyToMany(() => Hall, {
    pivotTable: 'hall_amenities',
    pivotColumns: ['additional_cost', 'is_included'],
  })
  declare halls: ManyToMany<typeof Hall>
}
