import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = nearbyGymBodySchema.parse(request.query)

  const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymUseCase.execute({
    userGeoLocation: { latitude, longitude },
  })
  return reply.status(200).send({
    gyms,
  })
}
