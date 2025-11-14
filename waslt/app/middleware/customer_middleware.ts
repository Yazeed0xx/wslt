import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * CustomerMiddleware
 * 
 * Ensures the authenticated user has the CUSTOMER role.
 * This middleware should be applied to customer-only routes.
 * 
 * Prerequisites:
 * - User must be authenticated (use auth middleware before this)
 * 
 * Usage in routes:
 * Route.group(() => {
 *   // customer routes here
 * }).middleware(['auth', 'customer'])
 */
export default class CustomerMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    // Defensive check - should not happen if auth middleware is applied first
    if (!user) {
      return response.unauthorized({
        message: 'You must be logged in to access this resource',
      })
    }

    // Check if user has CUSTOMER role
    if (user.role !== 'CUSTOMER') {
      return response.forbidden({
        message: 'This resource is only accessible to customers',
        hint: 'You need a customer account to access this feature',
      })
    }

    // All checks passed, proceed to the next middleware/controller
    return next()
  }
}