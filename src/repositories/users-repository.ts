import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUniqueByEmail(
    email: Prisma.UserCreateInput['email'],
  ): Promise<User | null>
}
