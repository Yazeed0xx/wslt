import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ReviewFactory } from '#database/factories/review_factory'
import Booking from '#models/booking'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding reviews...')

    // Get completed bookings that can be reviewed
    const completedBookings = await Booking.query()
      .where('status', 'COMPLETED')
      .preload('customer')
      .preload('hall')

    if (completedBookings.length === 0) {
      console.log('⚠️  No completed bookings found. Skipping review seeding.')
      return
    }

    // Create reviews for 70% of completed bookings
    const reviewCount = Math.ceil(completedBookings.length * 0.7)

    for (let i = 0; i < reviewCount; i++) {
      const booking = completedBookings[i]

      const shouldHaveResponse = Math.random() > 0.5
      const shouldHavePhotos = Math.random() > 0.6

      const review = await ReviewFactory.merge({
        hallId: booking.hallId,
        userId: booking.customerId,
        bookingId: booking.id,
        businessResponse: shouldHaveResponse ? 'Thank you for your review!' : null,
        businessRespondedAt: shouldHaveResponse
          ? DateTime.now().minus({ days: Math.floor(Math.random() * 10) })
          : null,
      }).create()

      // Add photos to review if needed
      if (shouldHavePhotos) {
        const numPhotos = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numPhotos; j++) {
          const seed = `review-${review.id}-${j}`
          await review.related('photos').create({
            photoUrl: `https://picsum.photos/seed/${seed}/800/600`,
            thumbnailUrl: `https://picsum.photos/seed/${seed}/200/150`,
          })
        }
      }

      console.log(`  ✓ Created review for booking: ${booking.bookingNumber}`)
    }

    console.log('✅ Reviews seeded successfully!')
  }
}

