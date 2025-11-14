import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Amenity from '#models/amenity'
import Hall from '#models/hall'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding halls...')

    // Get all business users
    const businessUsers = await User.query().where('role', 'BUSINESS').where('business_status', 'APPROVED')

    if (businessUsers.length === 0) {
      console.log('⚠️  No business users found. Skipping hall seeding.')
      return
    }

    // Get all amenities
    const allAmenities = await Amenity.all()

    if (allAmenities.length === 0) {
      console.log('⚠️  No amenities found. Skipping hall seeding.')
      return
    }

    // Create 10 halls with photos and amenities
    for (let i = 0; i < 10; i++) {
      const owner = businessUsers[i % businessUsers.length]

      // Create hall directly
      const hall = await Hall.create({
        ownerId: owner.id,
        name: `Wedding Hall ${i + 1}`,
        description: 'A beautiful wedding hall for your special day',
        address: 'King Fahd Road',
        city: 'Riyadh',
        district: 'Olaya',
        latitude: 24.7 + i * 0.01,
        longitude: 46.7 + i * 0.01,
        minCapacity: 100,
        maxCapacity: 500,
        basePrice: 15000,
        pricePerPerson: 100,
        depositAmount: 5000,
        depositType: 'FIXED' as const,
        hallType: 'INDOOR' as const,
        hallCategory: 'STANDARD' as const,
        status: 'ACTIVE' as const,
        minBookingNoticeDays: 14,
        maxBookingDurationHours: 8,
        bufferTimeHours: 4,
        cancellationPolicy: 'Cancellation allowed up to 30 days before the event',
        averageRating: 4.5,
        totalReviews: 0,
        totalBookings: 0,
      })

      // Create photos for the hall
      const photoTypes = ['MAIN', 'INTERIOR', 'EXTERIOR', 'SETUP', 'CATERING'] as const
      for (let j = 0; j < 5; j++) {
        const seed = `${hall.name}-${j}`
        await hall.related('photos').create({
          photoUrl: `https://picsum.photos/seed/${seed}/800/600`,
          thumbnailUrl: `https://picsum.photos/seed/${seed}/200/150`,
          photoType: photoTypes[j],
          displayOrder: j,
          isPrimary: j === 0,
        })
      }

      // Attach 3-5 random amenities
      const numAmenities = Math.floor(Math.random() * 3) + 3
      const shuffledAmenities = [...allAmenities].sort(() => 0.5 - Math.random())
      const selectedAmenities = shuffledAmenities.slice(0, numAmenities)

      const amenityPivotData: Record<number, { additional_cost: number; is_included: boolean }> =
        {}

      for (const amenity of selectedAmenities) {
        amenityPivotData[amenity.id] = {
          additional_cost: Math.random() > 0.5 ? Math.floor(Math.random() * 2000) : 0,
          is_included: Math.random() > 0.3,
        }
      }

      await hall.related('amenities').attach(amenityPivotData)

      console.log(`  ✓ Created hall: ${hall.name}`)
    }

    console.log('✅ Halls seeded successfully!')
  }
}

