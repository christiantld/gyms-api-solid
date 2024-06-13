import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const gym = createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute(gym)
  return reply.status(201).send()
}
