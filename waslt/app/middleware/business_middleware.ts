import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class BusinessMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    // Get the authenticated user
    const user = auth.user

    // Check if user is authenticated (should be handled by auth middleware first)
    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }

    // Check if user role is BUSINESS
    if (user.role !== 'BUSINESS') {
      return response.forbidden({
        message: 'Access denied. Only business accounts can access this resource',
      })
    }

    // Check if business account is approved
    if (user.businessStatus !== 'APPROVED') {
      if (user.businessStatus === 'PENDING') {
        return response.forbidden({
          message: 'Your business account is pending approval. Please wait for admin approval',
        })
      }

      if (user.businessStatus === 'SUSPENDED') {
        return response.forbidden({
          message: 'Your business account has been suspended. Please contact support',
        })
      }

      // For null or any other status
      return response.forbidden({
        message: 'Your business account is not active',
      })
    }

    // All checks passed, proceed to the next middleware or controller
    const output = await next()
    return output
  }
}