import { GetUserMetricsUseCase } from '.'
import { CheckInsRepository } from '@/repositories/check-in-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let mockCheckInRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('get user metrics', () => {
  beforeEach(() => {
    mockCheckInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(mockCheckInRepository)
  })
  it('should be able to get user check-ins metrics by user id', async () => {
    await mockCheckInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await mockCheckInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    await mockCheckInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(3)
  })
})
