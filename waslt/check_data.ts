import User from './app/models/user.js'
import Hall from './app/models/hall.js'
import Booking from './app/models/booking.js'
import Payment from './app/models/payment.js'
import Review from './app/models/review.js'
import Amenity from './app/models/amenity.js'

const users = await User.query().count('* as total')
const halls = await Hall.query().count('* as total')
const bookings = await Booking.query().count('* as total')
const payments = await Payment.query().count('* as total')
const reviews = await Review.query().count('* as total')
const amenities = await Amenity.query().count('* as total')

console.log('\n📊 Database Statistics:\n')
console.log(`Users: ${users[0].$extras.total}`)
console.log(`Halls: ${halls[0].$extras.total}`)
console.log(`Bookings: ${bookings[0].$extras.total}`)
console.log(`Payments: ${payments[0].$extras.total}`)
console.log(`Reviews: ${reviews[0].$extras.total}`)
console.log(`Amenities: ${amenities[0].$extras.total}`)

// Show halls if any
if (halls[0].$extras.total > 0) {
  const hallList = await Hall.query().select('id', 'name', 'city', 'owner_id').limit(5)
  console.log('\n🏛️  Sample Halls:')
  hallList.forEach(h => {
    console.log(`  - ${h.name} (${h.city}) - Owner: ${h.ownerId}`)
  })
}

// Show bookings if any
if (bookings[0].$extras.total > 0) {
  const bookingList = await Booking.query().select('id', 'booking_number', 'status').limit(5)
  console.log('\n📅 Sample Bookings:')
  bookingList.forEach(b => {
    console.log(`  - ${b.bookingNumber} - Status: ${b.status}`)
  })
}

process.exit(0)

