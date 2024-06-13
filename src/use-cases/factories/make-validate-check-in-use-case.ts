import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { ValidateCheckInUseCase } from '../validate-check-in/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInRepository)
}
