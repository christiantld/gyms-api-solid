import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function historyCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const historyGymBodySchema = z.object({
    page: z.coerce.number().int().positive().min(1).default(1),
  })

  const { page } = historyGymBodySchema.parse(request.query)
  const userId = request.user.sub

  const historyGymUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await historyGymUseCase.execute({
    page,
    userId,
  })
  return reply.status(200).send({
    checkIns,
  })
}
