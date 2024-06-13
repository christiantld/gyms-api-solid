import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new GetUserMetricsUseCase(checkInRepository)
}
