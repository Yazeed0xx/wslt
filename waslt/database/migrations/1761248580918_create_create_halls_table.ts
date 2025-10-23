import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'halls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Owner reference (BUSINESS user)
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Basic info
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      
      // Location
      table.string('address').notNullable()
      table.string('city', 50).notNullable()
      table.string('district', 50).nullable()
      table.decimal('latitude', 10, 8).nullable()
      table.decimal('longitude', 11, 8).nullable()
      
      // Capacity
      table.integer('min_capacity').notNullable()
      table.integer('max_capacity').notNullable()
      
      // Pricing
      table.decimal('base_price', 10, 2).notNullable()
      table.decimal('price_per_person', 10, 2).nullable()
      table.decimal('deposit_amount', 10, 2).notNullable()
      table.enum('deposit_type', ['FIXED', 'PERCENTAGE']).defaultTo('PERCENTAGE')
      
      // Hall type and category
      table.enum('hall_type', ['INDOOR', 'OUTDOOR', 'MIXED']).notNullable()
      table.enum('hall_category', ['LUXURY', 'STANDARD', 'BUDGET']).notNullable()
      
      // Status
      table.enum('status', [
        'DRAFT',
        'PENDING_APPROVAL',
        'ACTIVE',
        'INACTIVE',
        'SUSPENDED'
      ]).defaultTo('DRAFT')
      
      // Policies
      table.integer('min_booking_notice_days').defaultTo(7)
      table.integer('max_booking_duration_hours').defaultTo(8)
      table.integer('buffer_time_hours').defaultTo(2)
      table.text('cancellation_policy').nullable()
      
      // SEO/Search optimization
      table.decimal('average_rating', 3, 2).defaultTo(0)
      table.integer('total_reviews').defaultTo(0)
      table.integer('total_bookings').defaultTo(0)
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
      
      // Indexes for better query performance
      table.index(['city', 'status'])
      table.index(['owner_id'])
      table.index(['status', 'average_rating'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
