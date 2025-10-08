import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('hotel_id').unsigned().references('id').inTable('hotels').onDelete('CASCADE')
      table.date('check_in_date').notNullable()
      table.date('check_out_date').notNullable()
      table.integer('number_of_guests').notNullable()
      table.float('total_price').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}