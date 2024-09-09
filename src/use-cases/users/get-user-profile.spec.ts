import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../users/get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let userRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase
describe('Get user profile use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })

  it('Should be able to return user profile', async () => {
    const createdUser = await userRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '00011122233',
      celular: '11999888777',
      password: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.nome).toEqual('John Doe')
  })

  it('Should NOT be able to return user profile with wrong ID', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'invalid-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
