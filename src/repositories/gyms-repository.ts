import { Coordinates } from '@/types'
import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyByLocation(coordinates: Coordinates): Promise<Gym[]>
}
