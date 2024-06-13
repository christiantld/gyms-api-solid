import { PrismaUsersRepository } from '@/repositories/prisma'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
