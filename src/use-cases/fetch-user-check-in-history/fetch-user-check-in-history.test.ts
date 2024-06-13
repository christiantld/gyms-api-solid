import { FetchUserCheckInHistoryUseCase } from '.'
import { CheckInsRepository } from '@/repositories/check-in-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let mockCheckInRepository: CheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch user check in history use case', () => {
  beforeEach(() => {
    mockCheckInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUseCase(mockCheckInRepository)
  })
  it('should fetch user check in history by user id', async () => {
    await mockCheckInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await mockCheckInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })
  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await mockCheckInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
