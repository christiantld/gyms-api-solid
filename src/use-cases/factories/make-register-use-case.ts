import { PrismaUsersRepository } from '@/repositories/prisma'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUserUseCase(usersRepository)
}
