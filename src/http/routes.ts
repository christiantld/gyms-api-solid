import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/registerUser'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
}
