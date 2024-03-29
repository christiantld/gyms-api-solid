import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

const ENCRYPT_SALT_ROUNDS = 6

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterUserUseCaseRequest) {
    const userEmailAlreadyExists =
      await this.usersRepository.findUniqueByEmail(email)

    if (userEmailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, ENCRYPT_SALT_ROUNDS)

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })
  }
}
