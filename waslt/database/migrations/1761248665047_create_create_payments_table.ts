import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Payment reference number
      table.string('payment_reference', 50).unique().notNullable()
      
      // References
      table.integer('booking_id').unsigned().references('id').inTable('bookings').onDelete('RESTRICT')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('RESTRICT')
      
      // Payment details
      table.decimal('amount', 10, 2).notNullable()
      table.enum('payment_type', [
        'DEPOSIT',
        'FULL_PAYMENT',
        'REMAINING',
        'REFUND'
      ]).notNullable()
      
      // Payment method (Saudi Arabia specific)
      table.enum('payment_method', [
        'CREDIT_CARD',
        'DEBIT_CARD',
        'MADA',           // Saudi payment network
        'APPLE_PAY',
        'STC_PAY',        // Saudi digital wallet
        'BANK_TRANSFER',
        'CASH'
      ]).notNullable()
      
      // Status
      table.enum('status', [
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'FAILED',
        'REFUNDED'
      ]).defaultTo('PENDING')
      
      // Payment gateway integration
      table.string('transaction_id').nullable()
      table.string('gateway_name', 50).nullable() // e.g., "Stripe", "Moyasar", "Tap"
      table.json('gateway_response').nullable()
      
      // Additional info
      table.text('notes').nullable()
      table.timestamp('processed_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Indexes
      table.index(['booking_id'])
      table.index(['user_id'])
      table.index(['status'])
      table.index(['payment_reference'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
