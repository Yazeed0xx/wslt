import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'push_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // User reference
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Push notification token
      table.string('token').notNullable().unique()
      
      // Platform and app type
      table.enum('platform', ['IOS', 'ANDROID']).notNullable()
      table.enum('app_type', ['CUSTOMER', 'BUSINESS']).notNullable()
      
      // Device info
      table.string('device_id').nullable()
      table.string('device_name').nullable()
      
      // Status
      table.boolean('is_active').defaultTo(true)
      table.timestamp('last_used_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Indexes
      table.index(['user_id', 'is_active'])
      table.index(['user_id', 'app_type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
