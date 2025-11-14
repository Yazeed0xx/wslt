import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding users...')

    // Create test customer account
    let customerUser = await User.findBy('email', 'customer@test.com')
    if (!customerUser) {
      customerUser = await User.create({
        email: 'customer@test.com',
        password: 'password',
        username: 'customer_test',
        phone: '+966501234567',
        role: 'CUSTOMER',
        emailVerified: true,
        phoneVerified: true,
      })

      await customerUser.related('profile').create({
        firstName: 'Ahmed',
        lastName: 'Ali',
        city: 'Riyadh',
        country: 'Saudi Arabia',
        fullAddress: 'King Fahd Road, Riyadh',
      })
    }

    // Create test business account
    let businessUser = await User.findBy('email', 'business@test.com')
    if (!businessUser) {
      businessUser = await User.create({
        email: 'business@test.com',
        password: 'password',
        username: 'business_test',
        phone: '+966507654321',
        role: 'BUSINESS',
        businessName: 'Golden Palace Events',
        businessDescription: 'Premium wedding and event hall services',
        businessLicenseNumber: '1234567890',
        businessStatus: 'APPROVED',
        emailVerified: true,
        phoneVerified: true,
      })

      await businessUser.related('profile').create({
        firstName: 'Mohammed',
        lastName: 'Khalid',
        city: 'Riyadh',
        country: 'Saudi Arabia',
        fullAddress: 'Olaya Street, Riyadh',
      })
    }

    // Create random customers (15) using factory
    const customers = await UserFactory.apply('customer').createMany(15)
    for (const customer of customers) {
      await customer.related('profile').create({
        firstName: customer.username,
        city: 'Riyadh',
        country: 'Saudi Arabia',
      })
    }

    // Create random business accounts (5 approved) using factory
    const businesses = await UserFactory.apply('business').createMany(5)
    for (const business of businesses) {
      await business.related('profile').create({
        firstName: business.businessName || 'Business',
        city: 'Riyadh',
        country: 'Saudi Arabia',
      })
    }

    // Create random pending business accounts (3) using factory
    const pendingBusinesses = await UserFactory.apply('pendingBusiness').createMany(3)
    for (const business of pendingBusinesses) {
      await business.related('profile').create({
        firstName: business.businessName || 'Business',
        city: 'Riyadh',
        country: 'Saudi Arabia',
      })
    }

    console.log('✅ Users seeded successfully!')
  }
}

