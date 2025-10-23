import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hall_photos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Hall reference
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('CASCADE')
      
      // Photo URLs
      table.string('photo_url').notNullable()
      table.string('thumbnail_url').nullable()
      
      // Photo type
      table.enum('photo_type', [
        'MAIN',
        'INTERIOR',
        'EXTERIOR',
        'SETUP',
        'CATERING',
        'OTHER'
      ]).defaultTo('OTHER')
      
      // Ordering and primary
      table.integer('display_order').defaultTo(0)
      table.boolean('is_primary').defaultTo(false)
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Index for fetching hall photos efficiently
      table.index(['hall_id', 'is_primary'])
      table.index(['hall_id', 'display_order'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
