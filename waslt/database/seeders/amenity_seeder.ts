import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Amenity from '#models/amenity'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding amenities...')

    const amenities = [
      // Facilities
      {
        name: 'Parking',
        nameAr: 'موقف سيارات',
        icon: 'car',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'WiFi',
        nameAr: 'واي فاي',
        icon: 'wifi',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'Air Conditioning',
        nameAr: 'تكييف',
        icon: 'air-conditioning',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'Prayer Room',
        nameAr: 'مصلى',
        icon: 'pray',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'Bridal Room',
        nameAr: 'غرفة العروس',
        icon: 'room',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'Stage',
        nameAr: 'مسرح',
        icon: 'stage',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'Dance Floor',
        nameAr: 'مكان للرقص',
        icon: 'dance',
        category: 'FACILITIES' as const,
        isActive: true,
      },
      {
        name: 'VIP Lounge',
        nameAr: 'صالة كبار الشخصيات',
        icon: 'vip',
        category: 'FACILITIES' as const,
        isActive: true,
      },

      // Services
      {
        name: 'Event Planning',
        nameAr: 'تخطيط الفعاليات',
        icon: 'planning',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Photography',
        nameAr: 'تصوير',
        icon: 'camera',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Videography',
        nameAr: 'تصوير فيديو',
        icon: 'video',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Decoration',
        nameAr: 'تزيين',
        icon: 'decoration',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Valet Parking',
        nameAr: 'خدمة صف السيارات',
        icon: 'valet',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Security',
        nameAr: 'أمن',
        icon: 'security',
        category: 'SERVICES' as const,
        isActive: true,
      },
      {
        name: 'Audio/Visual Equipment',
        nameAr: 'معدات صوتية ومرئية',
        icon: 'av',
        category: 'SERVICES' as const,
        isActive: true,
      },

      // Entertainment
      {
        name: 'DJ',
        nameAr: 'دي جي',
        icon: 'dj',
        category: 'ENTERTAINMENT' as const,
        isActive: true,
      },
      {
        name: 'Live Band',
        nameAr: 'فرقة موسيقية حية',
        icon: 'band',
        category: 'ENTERTAINMENT' as const,
        isActive: true,
      },
      {
        name: 'Kids Entertainment',
        nameAr: 'ترفيه للأطفال',
        icon: 'kids',
        category: 'ENTERTAINMENT' as const,
        isActive: true,
      },
      {
        name: 'Traditional Performers',
        nameAr: 'عروض تقليدية',
        icon: 'performers',
        category: 'ENTERTAINMENT' as const,
        isActive: true,
      },

      // Food & Catering
      {
        name: 'Catering Service',
        nameAr: 'خدمة تقديم الطعام',
        icon: 'catering',
        category: 'FOOD' as const,
        isActive: true,
      },
      {
        name: 'Custom Menu',
        nameAr: 'قائمة مخصصة',
        icon: 'menu',
        category: 'FOOD' as const,
        isActive: true,
      },
      {
        name: 'Halal Options',
        nameAr: 'خيارات حلال',
        icon: 'halal',
        category: 'FOOD' as const,
        isActive: true,
      },
      {
        name: 'Dessert Station',
        nameAr: 'محطة حلويات',
        icon: 'dessert',
        category: 'FOOD' as const,
        isActive: true,
      },
      {
        name: 'Coffee/Tea Service',
        nameAr: 'خدمة القهوة والشاي',
        icon: 'coffee',
        category: 'FOOD' as const,
        isActive: true,
      },
    ]

    for (const amenity of amenities) {
      await Amenity.firstOrCreate({ name: amenity.name }, amenity)
    }

    console.log(`✅ Amenities seeded successfully! (${amenities.length} amenities)`)
  }
}

