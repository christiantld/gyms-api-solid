import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const userId = request.user.sub

  try {
    const { user } = await getUserProfileUseCase.execute({ userId })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
}
