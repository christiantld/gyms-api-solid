import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '.'

let mockGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    mockGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(mockGymsRepository)
  })
  it('should register a new user', async () => {
    const { gym } = await sut.execute({
      name: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456',
      latitude: -15.7996325,
      longitude: -47.8815089,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
