import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hall_amenities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // References
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('CASCADE')
      table.integer('amenity_id').unsigned().references('id').inTable('amenities').onDelete('CASCADE')
      
      // Additional cost for this amenity at this specific hall
      table.decimal('additional_cost', 10, 2).defaultTo(0)
      
      // Is it included in base price or costs extra?
      table.boolean('is_included').defaultTo(true)
      
      table.timestamp('created_at')
      
      // Ensure unique hall-amenity combination
      table.unique(['hall_id', 'amenity_id'])
      table.index(['hall_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
