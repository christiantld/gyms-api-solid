import { RegisterUserUseCase } from '.'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

let mockUsersRepository: UsersRepository
let sut: RegisterUserUseCase

describe('Register User use case', () => {
  beforeEach(() => {
    mockUsersRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(mockUsersRepository)
  })
  it('should register a new user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    const isPasswordHashValid = await compare('123456', user.password_hash)

    expect(isPasswordHashValid).toBe(true)
  })

  it('should throw an error if user already exists', async () => {
    await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
