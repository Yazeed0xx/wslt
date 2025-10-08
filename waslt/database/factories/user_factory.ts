import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { UserProfileFactory } from './user_profile_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: 'password', // Plain password, will be hashed by the model hook
      username: faker.internet.username(), // Updated deprecated method
    }
  })
  .relation('profile', () => UserProfileFactory)
  .build()
