import { Coordinates } from '@/types'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  private PER_PAGE = 20

  private getSkip(page: number) {
    return (page - 1) * this.PER_PAGE
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: this.getSkip(page),
      take: this.PER_PAGE,
    })

    return gyms
  }

  async findManyByLocation({ latitude, longitude }: Coordinates) {
    const gyms = prisma.$queryRaw<Gym[]>`
    SELECT * from gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
