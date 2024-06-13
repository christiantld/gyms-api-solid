import { PrismaGymsRepository } from '@/repositories/prisma'
import { SearchGymUseCase } from '../search-gyms'

export function makeSearchGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new SearchGymUseCase(gymRepository)
}
