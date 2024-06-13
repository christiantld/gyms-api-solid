import { PrismaGymsRepository } from '@/repositories/prisma'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new CreateGymUseCase(gymRepository)
}
