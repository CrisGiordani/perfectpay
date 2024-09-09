import { Prisma, Role, Status, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByCPF(cpf: string): Promise<User | null>
  findByCelular(celular: string): Promise<User | null>
  searchMany(query: string, page: number): Promise<User[]>
  fetch(page?: number): Promise<User[] | null>
  changeRole(id: string, role: Role): Promise<null>
  changeStatus(id: string, status: Status): Promise<null>
}
