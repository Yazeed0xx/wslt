import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // References
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('booking_id').unsigned().references('id').inTable('bookings')
        .onDelete('SET NULL').nullable()
      
      // Main rating (required)
      table.integer('rating').notNullable()
      table.text('review_text').nullable()
      
      // Detailed ratings (optional)
      table.integer('cleanliness_rating').nullable()
      table.integer('service_rating').nullable()
      table.integer('value_rating').nullable()
      table.integer('location_rating').nullable()
      
      // Moderation
      table.boolean('is_verified').defaultTo(false)    // From actual booking?
      table.boolean('is_approved').defaultTo(true)     // Admin approval
      table.boolean('is_reported').defaultTo(false)    // User reported
      
      // Business response
      table.text('business_response').nullable()
      table.timestamp('business_responded_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // One review per booking
      table.unique(['booking_id'])
      
      // Indexes
      table.index(['hall_id', 'is_approved'])
      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
