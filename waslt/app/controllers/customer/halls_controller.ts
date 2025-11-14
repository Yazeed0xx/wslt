import type { HttpContext } from '@adonisjs/core/http'
import { HallService } from '#services/hall_service'

export default class HallsController {
  /**
   * Browse all active halls
   * GET /api/customer/halls
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const city = request.input('city')
    const minCapacity = request.input('minCapacity')
    const maxCapacity = request.input('maxCapacity')
    const minPrice = request.input('minPrice')
    const maxPrice = request.input('maxPrice')

    const hallService = new HallService()
    const halls = await hallService.list({
      page,
      limit,
      status: 'ACTIVE', // Only show active halls to customers
      city,
      minCapacity,
      maxCapacity,
      minPrice,
      maxPrice,
    })

    return response.ok(halls)
  }

  /**
   * Get a single hall by ID (public view)
   * GET /api/customer/halls/:id
   */
  async show({ params, response }: HttpContext) {
    const hallService = new HallService()
    const hall = await hallService.find(params.id)

    if (!hall) {
      return response.notFound({
        message: 'Hall not found',
      })
    }

    // Only show active halls to customers
    if (hall.status !== 'ACTIVE') {
      return response.notFound({
        message: 'Hall not found',
      })
    }

    return response.ok(hall)
  }

  /**
   * Search halls with filters
   * GET /api/customer/halls/search
   */
  async search({ request, response }: HttpContext) {
    const query = request.input('query', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const hallService = new HallService()
    const halls = await hallService.search(query, page, limit)

    return response.ok(halls)
  }
}