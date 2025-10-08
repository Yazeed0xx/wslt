import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column()
  declare name: string

  @column()
  declare location: string

  @column()
  declare description: string

  @column()
  declare rating: number

  @column()
  declare imageUrl: string

  @column()
  declare pricePerNight: number

  @column()
  declare phoneNumber: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
