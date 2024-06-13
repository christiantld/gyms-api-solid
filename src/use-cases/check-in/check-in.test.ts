import { CheckInUseCase } from '.'

import { CheckInsRepository } from '@/repositories/check-in-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let mockCheckInRepository: CheckInsRepository
let mockGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In  User use case', () => {
  beforeEach(() => {
    mockCheckInRepository = new InMemoryCheckInsRepository()
    mockGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(mockCheckInRepository, mockGymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('∙ Check in validate by day', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('2024-01-01 10:00:00'))
      mockGymsRepository.create({
        id: 'gym-1',
        name: 'Gym 1',
        description: 'Gym 1 description',
        latitude: 0.0,
        longitude: 0.0,
        phone: '123456789',
      })
      afterEach(() => {
        mockGymsRepository.gyms = []
      })
    })
    it('should be able to check in', async () => {
      const { checkIn } = await sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userGeoLocation: {
          latitude: 0,
          longitude: 0,
        },
      })

      expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
      await sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userGeoLocation: {
          latitude: 0,
          longitude: 0,
        },
      })

      await expect(
        sut.execute({
          gymId: 'gym-1',
          userId: 'user-1',
          userGeoLocation: {
            latitude: 0,
            longitude: 0,
          },
        }),
      ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
      await sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userGeoLocation: {
          latitude: 0,
          longitude: 0,
        },
      })

      // Change the date to the next day
      vi.setSystemTime(new Date('2024-02-01 10:00:00'))

      const { checkIn } = await sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userGeoLocation: {
          latitude: 0,
          longitude: 0,
        },
      })

      expect(checkIn.id).toEqual(expect.any(String))
    })
  })
  describe('∙ Check in validate by distance', () => {
    it('should not be able to check in if gym is not found', async () => {
      await expect(
        sut.execute({
          gymId: 'gym-1',
          userId: 'user-1',
          userGeoLocation: {
            latitude: 0,
            longitude: 0,
          },
        }),
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to check in on distant gym', async () => {
      mockGymsRepository.create({
        id: 'gym-1',
        name: 'Gym 1',
        description: 'Gym 1 description',
        latitude: -15.7991706,
        longitude: -47.922897,
        phone: '123456789',
      })

      await expect(
        sut.execute({
          gymId: 'gym-1',
          userId: 'user-1',
          userGeoLocation: {
            latitude: -15.7996325,
            longitude: -47.8815089,
          },
        }),
      ).rejects.toBeInstanceOf(Error)
    })
  })
})
