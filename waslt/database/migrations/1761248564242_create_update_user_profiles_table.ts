import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Drop old fields that are too restrictive
      table.dropColumn('bio')
      table.dropColumn('profile_picture')
      table.dropColumn('phone_number')
      table.dropColumn('address')
    })

    // Add new flexible fields
    this.schema.alterTable(this.tableName, (table) => {
      table.string('first_name', 50).nullable()
      table.string('last_name', 50).nullable()
      table.string('avatar_url').nullable()
      table.text('bio').nullable()
      table.date('date_of_birth').nullable()
      
      // Address fields
      table.string('city', 50).nullable()
      table.string('district', 50).nullable()
      table.string('country', 50).defaultTo('Saudi Arabia')
      table.text('full_address').nullable()
      
      // Preferences (can store JSON data)
      table.json('preferences').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('avatar_url')
      table.dropColumn('date_of_birth')
      table.dropColumn('city')
      table.dropColumn('district')
      table.dropColumn('country')
      table.dropColumn('full_address')
      table.dropColumn('preferences')
    })

    // Restore old fields
    this.schema.alterTable(this.tableName, (table) => {
      table.string('bio').notNullable()
      table.string('profile_picture').notNullable()
      table.string('phone_number').notNullable()
      table.string('address').notNullable()
    })
  }
}
