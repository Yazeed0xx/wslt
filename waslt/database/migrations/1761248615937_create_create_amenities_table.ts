import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'amenities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Amenity name (English and Arabic)
      table.string('name', 100).notNullable()
      table.string('name_ar', 100).nullable()
      
      // Icon for mobile app display
      table.string('icon', 50).nullable()
      
      // Category
      table.enum('category', [
        'FACILITIES',     // Parking, WiFi, AC, etc.
        'SERVICES',       // Catering, Decoration, Photography
        'ENTERTAINMENT',  // DJ, Live Band, Kids Area
        'FOOD'           // Kitchen, Buffet, Beverages
      ]).notNullable()
      
      // Active status
      table.boolean('is_active').defaultTo(true)
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
