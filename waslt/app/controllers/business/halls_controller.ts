import type { HttpContext } from '@adonisjs/core/http'
import { HallService } from '#services/hall_service'

export default class HallsController {
  /**
   * Get all halls for the authenticated business user
   * GET /api/business/halls
   */
  async index({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const hallService = new HallService()
    const halls = await hallService.getByOwner(user.id, page, limit)

    return response.ok(halls)
  }

  /**
   * Get a single hall by ID (must be owned by authenticated user)
   * GET /api/business/halls/:id
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const hallService = new HallService()

    try {
      const hall = await hallService.find(params.id)

      // Check ownership
      if (hall.ownerId !== user.id) {
        return response.forbidden({
          message: 'You do not have permission to view this hall',
        })
      }

      return response.ok(hall)
    } catch (error) {
      return response.notFound({
        message: 'Hall not found',
      })
    }
  }

  /**
   * Create a new hall
   * POST /api/business/halls
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    
    const data = {
      name: request.input('name'),
      description: request.input('description'),
      address: request.input('address'),
      city: request.input('city'),
      district: request.input('district'),
      latitude: request.input('latitude'),
      longitude: request.input('longitude'),
      minCapacity: request.input('minCapacity'),
      maxCapacity: request.input('maxCapacity'),
      basePrice: request.input('basePrice'),
      pricePerPerson: request.input('pricePerPerson'),
      depositAmount: request.input('depositAmount'),
      depositType: request.input('depositType'),
      hallType: request.input('hallType'),
      hallCategory: request.input('hallCategory'),
      minBookingNoticeDays: request.input('minBookingNoticeDays'),
      maxBookingDurationHours: request.input('maxBookingDurationHours'),
      bufferTimeHours: request.input('bufferTimeHours'),
      cancellationPolicy: request.input('cancellationPolicy'),
    }

    const hallService = new HallService()
    const hall = await hallService.create(user.id, data)

    return response.created({
      message: 'Hall created successfully',
      data: hall,
    })
  }

  /**
   * Update an existing hall
   * PUT/PATCH /api/business/halls/:id
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    
    const data = {
      name: request.input('name'),
      description: request.input('description'),
      address: request.input('address'),
      city: request.input('city'),
      district: request.input('district'),
      latitude: request.input('latitude'),
      longitude: request.input('longitude'),
      minCapacity: request.input('minCapacity'),
      maxCapacity: request.input('maxCapacity'),
      basePrice: request.input('basePrice'),
      pricePerPerson: request.input('pricePerPerson'),
      depositAmount: request.input('depositAmount'),
      depositType: request.input('depositType'),
      hallType: request.input('hallType'),
      hallCategory: request.input('hallCategory'),
      minBookingNoticeDays: request.input('minBookingNoticeDays'),
      maxBookingDurationHours: request.input('maxBookingDurationHours'),
      bufferTimeHours: request.input('bufferTimeHours'),
      cancellationPolicy: request.input('cancellationPolicy'),
    }

    const hallService = new HallService()

    try {
      const hall = await hallService.update(params.id, user.id, data)

      return response.ok({
        message: 'Hall updated successfully',
        data: hall,
      })
    } catch (error) {
      return response.notFound({
        message: 'Hall not found or you do not have permission to update it',
      })
    }
  }

  /**
   * Delete a hall
   * DELETE /api/business/halls/:id
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const hallService = new HallService()
    await hallService.delete(params.id, user.id)

    return response.ok({
      message: 'Hall deleted successfully',
    })
  }

  /**
   * Update hall status (ACTIVE, INACTIVE, etc.)
   * PATCH /api/business/halls/:id/status
   */
  async updateStatus({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const status = request.input('status')

    if (!status) {
      return response.badRequest({
        message: 'Status is required',
      })
    }

    const hallService = new HallService()

    try {
      // First, get the hall to check ownership
      const hall = await hallService.find(params.id)

      // Check ownership
      if (hall.ownerId !== user.id) {
        return response.forbidden({
          message: 'You do not have permission to update this hall',
        })
      }

      // Update status
      const updatedHall = await hallService.updateStatus(params.id, status)

      return response.ok({
        message: 'Hall status updated successfully',
        data: updatedHall,
      })
    } catch (error) {
      return response.notFound({
        message: 'Hall not found',
      })
    }
  }
} 