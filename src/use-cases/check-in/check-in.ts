import { CheckInsRepository } from '@/repositories/check-in-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Coordinates } from '@/types'

interface CheckInUseCaseRequest {
  gymId: string
  userId: string
  userGeoLocation: Coordinates
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  private MAX_DISTANCE_IN_METERS = 100

  async execute({
    gymId,
    userId,
    userGeoLocation,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError('Gym')
    }

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(userGeoLocation, {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    })

    if (distance > this.MAX_DISTANCE_IN_METERS) {
      throw new Error('User is too far from gym')
    }

    const checkInAlreadyExists =
      await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInAlreadyExists) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
