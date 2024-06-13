import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().cuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  console.log('checkInId', checkInId)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({ checkInId })
  return reply.status(204).send()
}
