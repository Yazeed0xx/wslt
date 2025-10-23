import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'review_photos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Review reference
      table.integer('review_id').unsigned().references('id').inTable('reviews').onDelete('CASCADE')
      
      // Photo URLs
      table.string('photo_url').notNullable()
      table.string('thumbnail_url').nullable()
      
      table.timestamp('created_at')
      
      // Index for efficient fetching
      table.index(['review_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
