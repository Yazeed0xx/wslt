import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'favorites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // References
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('hall_id').unsigned().references('id').inTable('halls').onDelete('CASCADE')
      
      table.timestamp('created_at')
      
      // Ensure unique user-hall combination
      table.unique(['user_id', 'hall_id'])
      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
