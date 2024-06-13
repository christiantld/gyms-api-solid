import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { registerUserController } from './register-user'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refresh)

  // ? Authenticated routes
  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
