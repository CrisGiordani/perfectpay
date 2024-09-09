import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserCpfAlreadyExistsError } from './errors/user-cpf-already-exists'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists'
import { RegisterUseCase } from './register'

let inMemoryUserRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase
describe('Register use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(inMemoryUserRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '00011122233',
      celular: '11999888777',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('Should crypt user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '00011122233',
      celular: '11999888777',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('Should not able to register with an email already used', async () => {
    const email = 'johndoe2@example.com'

    await registerUseCase.execute({
      nome: 'John Doe',
      email,
      cpf: '00011122233',
      celular: '11999888777',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        nome: 'John Doe',
        email,
        cpf: '00011122233',
        celular: '11999888777',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })

  it('Should not able to register with an CPF already used', async () => {
    const cpf = '00011122233'

    await registerUseCase.execute({
      nome: 'John Doe',
      email: 'johndoe1@example.com',
      cpf,
      celular: '11999888777',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        nome: 'John Doe',
        email: 'johndoe2@example.com',
        cpf,
        celular: '11999888777',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserCpfAlreadyExistsError)
  })
})
