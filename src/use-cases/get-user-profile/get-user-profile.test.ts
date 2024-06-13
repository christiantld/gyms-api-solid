import { GetUserProfileUseCase } from '.'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let mockUsersRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    mockUsersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(mockUsersRepository)
  })
  it('should find user by id', async () => {
    const createdUser = await mockUsersRepository.create({
      id: 'user-1',
      email: 'johndoe@email.com',
      name: 'John Doe',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      userId: 'user-1',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual(createdUser.email)
  })

  it('should throw an error if user is not found', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-a-valid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
