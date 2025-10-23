import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // User reference
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Notification content
      table.string('title', 100).notNullable()
      table.text('body').notNullable()
      
      // Notification type
      table.enum('type', [
        'BOOKING_CREATED',
        'BOOKING_CONFIRMED',
        'BOOKING_CANCELLED',
        'BOOKING_REJECTED',
        'PAYMENT_SUCCESS',
        'PAYMENT_FAILED',
        'REVIEW_RECEIVED',
        'HALL_APPROVED',
        'HALL_REJECTED',
        'PROMOTION',
        'REMINDER',
        'OTHER'
      ]).notNullable()
      
      // Related resource (for deep linking)
      table.string('resource_type', 50).nullable() // 'booking', 'hall', 'payment', 'review'
      table.integer('resource_id').nullable()
      
      // Additional data for mobile app (JSON)
      table.json('data').nullable()
      
      // Read status
      table.boolean('is_read').defaultTo(false)
      table.timestamp('read_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Indexes
      table.index(['user_id', 'is_read'])
      table.index(['user_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
