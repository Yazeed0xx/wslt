import factory from '@adonisjs/lucid/factories'
import Hotel from '#models/hotel'

export const HotelFactory = factory
  .define(Hotel, async ({ faker }) => {
    return {
      name: faker.company.name(),
      location: faker.location.city(),
      description: faker.lorem.paragraph(),
      rating: faker.number.int({ min: 1, max: 5 }),
      imageUrl: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      pricePerNight: faker.number.int({ min: 50, max: 500 }),
      phoneNumber: faker.phone.number(),
      
    }
  })
  .build()