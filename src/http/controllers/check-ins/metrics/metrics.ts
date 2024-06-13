import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metricsCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const metricsGymUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await metricsGymUseCase.execute({ userId })
  return reply.status(200).send({
    checkInsCount,
  })
}
