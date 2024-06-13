import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Coordinates } from '@/types'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []
  private MAX_DISTANCE = 10000 // 10km

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym || null
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms
      .filter((gym) => gym.name.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyByLocation(geolocation: Coordinates): Promise<Gym[]> {
    return this.gyms.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: geolocation.latitude, longitude: geolocation.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < this.MAX_DISTANCE
    })
  }
}
