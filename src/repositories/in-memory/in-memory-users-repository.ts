import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
    }

    this.users.push(user)
    return user
  }

  async findUniqueByEmail(email: User['email']) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
