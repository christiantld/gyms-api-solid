import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { Coordinates } from '@/types'

interface FetchNearbyGymsUseCaseRequest {
  userGeoLocation: Coordinates
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userGeoLocation,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyByLocation(userGeoLocation)

    return {
      gyms,
    }
  }
}
