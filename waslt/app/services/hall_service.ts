import Hall from '#models/hall'
import { DateTime } from 'luxon'

export class HallService {
  /**
   * Get all halls with optional filters
   */
  async list(filters: {
    city?: string
    hallType?: string
    minCapacity?: number
    maxCapacity?: number
    minPrice?: number
    maxPrice?: number
    status?: string
    page?: number
    limit?: number
  } = {}) {
    const query = Hall.query()
      .preload('owner')
      .preload('photos')
      .preload('amenities')
      .whereNull('deleted_at')

    // Apply filters
    if (filters.city) {
      query.where('city', filters.city)
    }

    if (filters.hallType) {
      query.where('hall_type', filters.hallType)
    }

    if (filters.minCapacity) {
      query.where('max_capacity', '>=', filters.minCapacity)
    }

    if (filters.maxCapacity) {
      query.where('min_capacity', '<=', filters.maxCapacity)
    }

    if (filters.minPrice) {
      query.where('base_price', '>=', filters.minPrice)
    }

    if (filters.maxPrice) {
      query.where('base_price', '<=', filters.maxPrice)
    }

    if (filters.status) {
      query.where('status', filters.status)
    } else {
      // By default, only show active halls
      query.where('status', 'ACTIVE')
    }

    // Pagination
    const page = filters.page || 1
    const limit = filters.limit || 10

    return await query.paginate(page, limit)
  }

  /**
   * Get a single hall by ID
   */
  async find(id: number) {
    const hall = await Hall.query()
      .where('id', id)
      .whereNull('deleted_at')
      .preload('owner')
      .preload('photos')
      .preload('amenities')
      .preload('reviews', (query) => {
        query.where('is_approved', true).preload('user').preload('photos')
      })
      .first()

    if (!hall) {
      throw new Error('Hall not found')
    }

    return hall
  }

  /**
   * Create a new hall
   */
  async create(ownerId: number, data: {
    name: string
    description?: string
    address: string
    city: string
    district?: string
    latitude?: number
    longitude?: number
    minCapacity: number
    maxCapacity: number
    basePrice: number
    pricePerPerson?: number
    depositAmount: number
    depositType: 'FIXED' | 'PERCENTAGE'
    hallType: 'INDOOR' | 'OUTDOOR' | 'MIXED'
    hallCategory: 'LUXURY' | 'STANDARD' | 'BUDGET'
    minBookingNoticeDays?: number
    maxBookingDurationHours?: number
    bufferTimeHours?: number
    cancellationPolicy?: string
  }) {
    const hall = await Hall.create({
      ownerId,
      ...data,
      status: 'PENDING_APPROVAL', // New halls need approval
      averageRating: 0,
      totalReviews: 0,
      totalBookings: 0,
    })

    return hall
  }

  /**
   * Update a hall
   */
  async update(id: number, ownerId: number, data: Partial<{
    name: string
    description: string
    address: string
    city: string
    district: string
    latitude: number
    longitude: number
    minCapacity: number
    maxCapacity: number
    basePrice: number
    pricePerPerson: number
    depositAmount: number
    depositType: 'FIXED' | 'PERCENTAGE'
    hallType: 'INDOOR' | 'OUTDOOR' | 'MIXED'
    hallCategory: 'LUXURY' | 'STANDARD' | 'BUDGET'
    minBookingNoticeDays: number
    maxBookingDurationHours: number
    bufferTimeHours: number
    cancellationPolicy: string
    status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  }>) {
    const hall = await Hall.query()
      .where('id', id)
      .where('owner_id', ownerId)
      .whereNull('deleted_at')
      .first()

    if (!hall) {
      throw new Error('Hall not found or you do not have permission to update it')
    }

    hall.merge(data)
    await hall.save()

    return hall
  }

  /**
   * Delete a hall (soft delete)
   */
  async delete(id: number, ownerId: number) {
    const hall = await Hall.query()
      .where('id', id)
      .where('owner_id', ownerId)
      .whereNull('deleted_at')
      .first()

    if (!hall) {
      throw new Error('Hall not found or you do not have permission to delete it')
    }

    hall.deletedAt = DateTime.now()
    await hall.save()

    return { message: 'Hall deleted successfully' }
  }

  /**
   * Search halls by name or description
   */
  async search(searchTerm: string, page: number = 1, limit: number = 10) {
    const halls = await Hall.query()
      .where((query) => {
        query
          .whereILike('name', `%${searchTerm}%`)
          .orWhereILike('description', `%${searchTerm}%`)
          .orWhereILike('city', `%${searchTerm}%`)
      })
      .where('status', 'ACTIVE')
      .whereNull('deleted_at')
      .preload('owner')
      .preload('photos')
      .paginate(page, limit)

    return halls
  }

  /**
   * Get halls by owner
   */
  async getByOwner(ownerId: number, page: number = 1, limit: number = 10) {
    const halls = await Hall.query()
      .where('owner_id', ownerId)
      .whereNull('deleted_at')
      .preload('photos')
      .preload('amenities')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return halls
  }

  /**
   * Update hall status (for admin or approval workflow)
   */
  async updateStatus(id: number, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL') {
    const hall = await Hall.findOrFail(id)
    hall.status = status
    await hall.save()

    return hall
  }
}
