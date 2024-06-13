import { PrismaUsersRepository } from '@/repositories/prisma'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetUserProfileUseCase(usersRepository)
}
