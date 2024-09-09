import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users-repository'
import { UserCelularAlreadyExistsError } from './errors/user-celular-already-exists'
import { UserCpfAlreadyExistsError } from './errors/user-cpf-already-exists'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  celular: string
  cpf: string
  password: string,
  role: Role
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    nome,
    email,
    celular,
    cpf,
    password,
    role
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserEmailAlreadyExistsError()
    }

    const userWithSameCPF = await this.usersRepository.findByCPF(cpf)

    if (userWithSameCPF) {
      throw new UserCpfAlreadyExistsError()
    }

    const userWithSameCelular = await this.usersRepository.findByCelular(celular)

    if (userWithSameCelular) {
      throw new UserCelularAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      nome,
      email,
      celular,
      cpf,
      password: password_hash,
      role
    })

    return {
      user,
    }
  }
}
