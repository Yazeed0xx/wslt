import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * AdminMiddleware
 * 
 * Ensures the authenticated user has the ADMIN role.
 * This middleware should be applied to admin-only routes.
 * 
 * Admins have full access to:
 * - Approve/reject business registrations
 * - Suspend/activate users and halls
 * - View all bookings, payments, and reviews
 * - Manage amenities and system settings
 * - View analytics and reports
 * 
 * Prerequisites:
 * - User must be authenticated (use auth middleware before this)
 * 
 * Usage in routes:
 * Route.group(() => {
 *   // admin routes here
 * }).middleware(['auth', 'admin'])
 */
export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    // Defensive check - should not happen if auth middleware is applied first
    if (!user) {
      return response.unauthorized({
        message: 'You must be logged in to access this resource',
      })
    }

    // Check if user has ADMIN role
    if (user.role !== 'ADMIN') {
      return response.forbidden({
        message: 'This resource is only accessible to administrators',
        hint: 'You need administrator privileges to access this feature',
      })
    }

    // All checks passed, proceed to the next middleware/controller
    return next()
  }
}

