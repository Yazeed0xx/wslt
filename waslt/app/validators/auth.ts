import vine from '@vinejs/vine'

export const registerSchema = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6),
        username: vine.string().minLength(3).maxLength(30),
    })
)

export const loginSchema = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6),
    })
)