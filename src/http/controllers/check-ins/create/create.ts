import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().cuid(),
  })

  const createCheckInBodySchema = z.object({
    userGeoLocation: z.object({
      latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
    }),
  })

  const { userGeoLocation } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const userId = request.user.sub

  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({ gymId, userGeoLocation, userId })
  return reply.status(201).send()
}
