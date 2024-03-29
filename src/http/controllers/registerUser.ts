import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/use-cases/registerUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const user = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    await registerUserUseCase.execute(user)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    throw error
  }
}
