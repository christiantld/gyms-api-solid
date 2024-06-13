import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createCheckInController } from './create'
import { validateCheckInController } from './validate'
import { historyCheckInController } from './history'
import { metricsCheckInController } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', historyCheckInController)
  app.get('/check-ins/metrics', metricsCheckInController)

  app.post('/gyms/:gymId/check-in', createCheckInController)
  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    validateCheckInController,
  )
}
