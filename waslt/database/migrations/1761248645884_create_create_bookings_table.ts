import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Booking reference number (user-friendly)
      table.string('booking_number', 50).unique().notNullable()
      
      // References
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('RESTRICT')
      table.integer('customer_id').unsigned().references('id').inTable('users').onDelete('RESTRICT')
      
      // Event details
      table.date('event_date').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      table.integer('guest_count').notNullable()
      table.enum('event_type', [
        'WEDDING',
        'ENGAGEMENT',
        'BIRTHDAY',
        'CORPORATE',
        'OTHER'
      ]).defaultTo('WEDDING')
      table.text('special_requests').nullable()
      
      // Contact info (might differ from user account)
      table.string('contact_name', 100).notNullable()
      table.string('contact_phone', 20).notNullable()
      table.string('contact_email').nullable()
      
      // Pricing breakdown
      table.decimal('base_price', 10, 2).notNullable()
      table.decimal('services_cost', 10, 2).defaultTo(0)
      table.decimal('total_amount', 10, 2).notNullable()
      table.decimal('deposit_paid', 10, 2).defaultTo(0)
      table.decimal('remaining_amount', 10, 2).notNullable()
      
      // Booking status workflow
      table.enum('status', [
        'PENDING',      // Customer created, waiting for business
        'CONFIRMED',    // Business confirmed
        'PAID',         // Full payment received
        'COMPLETED',    // Event happened
        'CANCELLED',    // Cancelled
        'REJECTED'      // Business rejected
      ]).defaultTo('PENDING')
      
      // Cancellation info
      table.enum('cancelled_by', ['CUSTOMER', 'BUSINESS']).nullable()
      table.text('cancellation_reason').nullable()
      table.timestamp('cancelled_at').nullable()
      
      // Workflow timestamps
      table.timestamp('confirmed_at').nullable()
      table.timestamp('paid_at').nullable()
      table.timestamp('completed_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Indexes for efficient queries
      table.index(['customer_id', 'status'])
      table.index(['hall_id', 'event_date'])
      table.index(['status'])
      table.index(['booking_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
