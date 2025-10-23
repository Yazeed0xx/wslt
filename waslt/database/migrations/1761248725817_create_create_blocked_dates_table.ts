import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blocked_dates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Hall reference
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('CASCADE')
      
      // Date and reason
      table.date('blocked_date').notNullable()
      table.enum('reason', [
        'BOOKED',
        'MAINTENANCE',
        'OWNER_BLOCKED',
        'HOLIDAY'
      ]).notNullable()
      table.text('notes').nullable()
      
      // If due to a booking, reference it
      table.integer('booking_id').unsigned().references('id').inTable('bookings')
        .onDelete('CASCADE').nullable()
      
      table.timestamp('created_at')
      
      // Indexes for availability checking
      table.index(['hall_id', 'blocked_date'])
      table.index(['hall_id', 'reason'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
