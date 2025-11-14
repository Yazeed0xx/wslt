import Factory from '@adonisjs/lucid/factories'
import ReviewPhoto from '#models/review_photo'

export const ReviewPhotoFactory = Factory.define(ReviewPhoto, ({ faker }) => {
  const seed = faker.string.alphanumeric(10)
  return {
    photoUrl: `https://picsum.photos/seed/${seed}/800/600`,
    thumbnailUrl: `https://picsum.photos/seed/${seed}/200/150`,
  }
}).build()

