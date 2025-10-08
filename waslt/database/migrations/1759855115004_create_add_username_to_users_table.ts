import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.alterTable("users", (table) => {
      table.string('username', 30).notNullable().unique()
    })
  }

  async down() {
    this.schema.table("users", (table) => {
      table.dropColumn("username")
    })
  }
}