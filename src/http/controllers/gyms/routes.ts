import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { searchGymController } from './search'
import { nearbyGymController } from './nearby'
import { createGymController } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', nearbyGymController)

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    createGymController,
  )
}
