import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository-interface'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async findById(idUsers: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: idUsers }, select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    }) as unknown as User
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }
}
