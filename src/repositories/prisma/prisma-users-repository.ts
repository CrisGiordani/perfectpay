import { prisma } from '@/lib/prisma'
import { Prisma, Role, Status } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { companies: true }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByCPF(cpf: string) {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    return user
  }

  async findByCelular(celular: string) {
    const user = await prisma.user.findUnique({
      where: {
        celular,
      },
    })

    return user
  }


  async searchMany(query: string, page: number) {
    const users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        nome: {
          contains: query,
        }
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return users
  }

  async fetch(page?: number) {
    if (!page) page = 1
    const users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE'
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return users
  }

  async changeRole(id: string, role: Role) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        role: role
      }
    })
    return null
  }

  async changeStatus(id: string, status: Status) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        status: status
      }
    })
    return null
  }

}
