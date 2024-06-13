import {
  PrismaCheckInsRepository,
  PrismaGymsRepository,
} from '@/repositories/prisma'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  return new CheckInUseCase(checkInRepository, gymRepository)
}
