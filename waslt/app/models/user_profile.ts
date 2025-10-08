import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare bio: string

  @column()
  declare profilePicture: string

  @column()
  declare phoneNumber: string

  @column()
  declare address: string

  


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}