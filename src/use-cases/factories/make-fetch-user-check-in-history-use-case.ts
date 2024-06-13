import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-in-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new FetchUserCheckInHistoryUseCase(checkInRepository)
}
