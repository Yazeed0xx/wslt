import Factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = Factory.define(User, ({ faker }) => {
  const randomDigits = faker.string.numeric(8)
  const phone = `+9665${randomDigits}`

  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    phone: phone,
    role: 'CUSTOMER' as const,
    emailVerified: faker.datatype.boolean(),
    phoneVerified: faker.datatype.boolean(),
  }
})
  .state('customer', (user) => {
    user.role = 'CUSTOMER'
  })
  .state('business', (user, { faker }) => {
    user.role = 'BUSINESS'
    user.businessName = faker.company.name()
    user.businessDescription = faker.company.catchPhrase()
    user.businessLicenseNumber = faker.string.numeric(10)
    user.businessStatus = 'APPROVED' as const
  })
  .state('pendingBusiness', (user, { faker }) => {
    user.role = 'BUSINESS'
    user.businessName = faker.company.name()
    user.businessDescription = faker.company.catchPhrase()
    user.businessLicenseNumber = faker.string.numeric(10)
    user.businessStatus = 'PENDING' as const
  })
  .build()

