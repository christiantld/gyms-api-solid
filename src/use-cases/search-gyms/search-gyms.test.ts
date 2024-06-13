import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from '.'

let mockGymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    mockGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(mockGymsRepository)
  })
  it('should search gym by title', async () => {
    mockGymsRepository.create({
      name: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    mockGymsRepository.create({
      name: 'Gym 02',
      description: 'Gym 02 description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })
    const { gyms } = await sut.execute({
      query: 'Gym 01',
      page: 1,
    })

    expect(gyms.length).toEqual(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Gym 01' })])
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await mockGymsRepository.create({
        name: `Gym test ${i}`,
        description: `Gym ${i}  description`,
        phone: '123456',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym test',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym test 21' }),
      expect.objectContaining({ name: 'Gym test 22' }),
    ])
  })
})
