import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Phone number - nullable first to handle existing users
      table.string('phone', 20).nullable()
      
      // Role field - CUSTOMER or BUSINESS
      table.enum('role', ['CUSTOMER', 'BUSINESS', 'ADMIN']).notNullable().defaultTo('CUSTOMER')
      
      // Business-specific fields (nullable for customers)
      table.string('business_name', 100).nullable()
      table.text('business_description').nullable()
      table.string('business_license_number', 50).nullable()
      table.enum('business_status', ['PENDING', 'APPROVED', 'SUSPENDED']).nullable()
      
      // Verification fields
      table.boolean('email_verified').defaultTo(false)
      table.boolean('phone_verified').defaultTo(false)
      
      // Soft delete
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('phone')
      table.dropColumn('role')
      table.dropColumn('business_name')
      table.dropColumn('business_description')
      table.dropColumn('business_license_number')
      table.dropColumn('business_status')
      table.dropColumn('email_verified')
      table.dropColumn('phone_verified')
      table.dropColumn('deleted_at')
    })
  }
}