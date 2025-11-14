import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    console.log('🚀 Starting database seeding...\n')

    // 1. Seed users first (required for halls and bookings)
    await this.seed(await import('#database/seeders/user_seeder'))

    // 2. Seed amenities (required for halls)
    await this.seed(await import('#database/seeders/amenity_seeder'))

    // 3. Seed halls (required for bookings)
    await this.seed(await import('#database/seeders/hall_seeder'))

    // 4. Seed bookings (required for reviews)
    await this.seed(await import('#database/seeders/booking_seeder'))

    // 5. Seed reviews (depends on completed bookings)
    await this.seed(await import('#database/seeders/review_seeder'))

    console.log('\n✨ Database seeding completed successfully!')
  }
}

