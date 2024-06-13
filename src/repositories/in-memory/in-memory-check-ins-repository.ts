import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      ...data,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const index = this.checkIns.findIndex((item) => item.id === checkIn.id)

    if (index >= 0) {
      this.checkIns[index] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    return this.checkIns.find((checkIn) => checkIn.id === id) || null
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, 40)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    return checkIn || null
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }
}
