import factory from '@adonisjs/lucid/factories'
import UserProfile from '#models/user_profile'

export const UserProfileFactory = factory
  .define(UserProfile, async ({ faker }) => {
    return {
      bio: faker.lorem.sentence(),
      profilePicture: faker.image.avatar(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
    }
  })
  .build()
