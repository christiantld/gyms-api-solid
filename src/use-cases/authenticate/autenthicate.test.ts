import { AuthenticateUseCase } from '.'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-errors'
import { UsersRepository } from '@/repositories/users-repository'

let sut: AuthenticateUseCase
let mockUsersRepository: UsersRepository

describe('Autenthicate User use case', () => {
  beforeEach(() => {
    mockUsersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(mockUsersRepository)
  })
  it('should be able to authenticate', async () => {
    mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user).toEqual(expect.objectContaining({ name: 'John Doe' }))
  })

  it('should not be able to authenticate with invalid email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with invalid password', async () => {
    mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
