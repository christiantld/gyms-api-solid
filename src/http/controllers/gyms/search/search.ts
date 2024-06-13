import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().int().positive().min(1).default(1),
  })

  const { page, query } = searchGymBodySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })
  return reply.status(200).send({
    gyms,
  })
}
