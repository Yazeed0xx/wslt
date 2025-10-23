import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UserProfile from './user_profile.js'
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare phone: string | null

  // Role field - CUSTOMER, BUSINESS, or ADMIN
  @column()
  declare role: 'CUSTOMER' | 'BUSINESS' | 'ADMIN'

  // Business-specific fields
  @column()
  declare businessName: string | null

  @column()
  declare businessDescription: string | null

  @column()
  declare businessLicenseNumber: string | null

  @column()
  declare businessStatus: 'PENDING' | 'APPROVED' | 'SUSPENDED' | null

  // Verification
  @column()
  declare emailVerified: boolean

  @column()
  declare phoneVerified: boolean

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relationships
  @hasOne(() => UserProfile)
  declare profile: HasOne<typeof UserProfile>

  // When user is BUSINESS - they own halls
  @hasMany(() => import('./hall.js').then(m => m.default), {
    foreignKey: 'ownerId'
  })
  declare halls: HasMany<any>

  // When user is CUSTOMER - they make bookings
  @hasMany(() => import('./booking.js').then(m => m.default), {
    foreignKey: 'customerId'
  })
  declare bookings: HasMany<any>

  @hasMany(() => import('./review.js').then(m => m.default))
  declare reviews: HasMany<any>

  @hasMany(() => import('./favorite.js').then(m => m.default))
  declare favorites: HasMany<any>

  @hasMany(() => import('./notification.js').then(m => m.default))
  declare notifications: HasMany<any>

  @hasMany(() => import('./push_token.js').then(m => m.default))
  declare pushTokens: HasMany<any>

  // Access tokens for authentication
  static accessTokens = DbAccessTokensProvider.forModel(User)
}