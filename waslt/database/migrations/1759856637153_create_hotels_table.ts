import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('location').notNullable()
      table.integer('rating').notNullable()
      table.text('description').notNullable()
      table.string('image_url').notNullable()
      table.string('phone_number').notNullable()
      table.float('price_per_night').notNullable()
      table


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}