import User from '#models/user'
import { loginSchema, registerSchema } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerSchema.validate(data)

    // Check if email or username already exists
    const existingUser = await User.query()
      .where('email', payload.email)
      .orWhere('username', payload.username)
      .first()

    if (existingUser) {
      if (existingUser.email === payload.email) {
        return response.conflict({ message: 'Email already taken' })
      }
      if (existingUser.username === payload.username) {
        return response.conflict({ message: 'Username already taken' })
      }
    }

    await User.create(payload)

    response.created({ user: payload })
  }

  async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const payload = await loginSchema.validate(data)
    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user)

    response.ok({
      ...user.toJSON(),
      token: token.value!.release(),
    })
  }
}
