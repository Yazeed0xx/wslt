import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Booking from './booking.js'
import User from './user.js'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare paymentReference: string

  @column()
  declare bookingId: number

  @column()
  declare userId: number

  @column()
  declare amount: number

  @column()
  declare paymentType: 'DEPOSIT' | 'FULL_PAYMENT' | 'REMAINING' | 'REFUND'

  @column()
  declare paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MADA' | 'APPLE_PAY' | 'STC_PAY' | 'BANK_TRANSFER' | 'CASH'

  @column()
  declare status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

  @column()
  declare transactionId: string | null

  @column()
  declare gatewayName: string | null

  @column()
  declare gatewayResponse: any | null

  @column()
  declare notes: string | null

  @column.dateTime()
  declare processedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
