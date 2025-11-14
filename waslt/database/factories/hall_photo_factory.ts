import Factory from '@adonisjs/lucid/factories'
import HallPhoto from '#models/hall_photo'

export const HallPhotoFactory = Factory.define(HallPhoto, ({ faker }) => {
  const seed = faker.string.alphanumeric(10)
  return {
    photoUrl: `https://picsum.photos/seed/${seed}/800/600`,
    thumbnailUrl: `https://picsum.photos/seed/${seed}/200/150`,
    photoType: faker.helpers.arrayElement([
      'MAIN',
      'INTERIOR',
      'EXTERIOR',
      'SETUP',
      'CATERING',
    ] as const),
    displayOrder: faker.number.int({ min: 0, max: 10 }),
    isPrimary: false,
  }
}).build()

