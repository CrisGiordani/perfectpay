import { Prisma, Role, Status, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async fetch(page: number) {
    const users = this.items.sort()
      .slice((page - 1) * 20, page * 20)

    if (!users) {
      return null
    }
    return users
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByCPF(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async findByCelular(celular: string) {
    const user = this.items.find((item) => item.celular === celular)

    if (!user) {
      return null
    }

    return user
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.nome.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      nome: data.nome,
      email: data.email,
      celular: data.celular,
      cpf: data.cpf,
      role: data.role || 'CLIENT',
      status: data.status || 'WAITING_APPROVAL',
      password: data.password || '123456',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async changeRole(id: string, role: Role) {
    const user = this.items.map(user => {
      if (user.id === id) {
        return { ...user, role }
      }
    })

    return null
  }

  async changeStatus(id: string, status: Status) {
    const user = this.items.map(user => {
      if (user.id === id) {
        return { ...user, status }
      }
    })

    return null
  }
}
