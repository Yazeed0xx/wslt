import { HotelFactory } from '#database/factories/hotel_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await HotelFactory.createMany(10)
    // Write your database queries inside the run method
  }
}