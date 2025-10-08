import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.with('profile').createMany(10)
    // Write your database queries inside the run method
  }
}