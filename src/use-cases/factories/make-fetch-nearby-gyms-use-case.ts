import { PrismaGymsRepository } from '@/repositories/prisma'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  return new FetchNearbyGymsUseCase(gymRepository)
}
