import { UsersRepository } from '@/repositories/users-repository'

export class FetchUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<Object[]> {
        const users = await this.usersRepository.fetch()

        if (!users) return [{}]

        const filteredUsers = users
            .filter(user => user.status === 'ACTIVE')
            .map(user => ({
                id: user.id,
                nome: user.nome,
                email: user.email,
                celular: user.celular,
                cpf: user.cpf,
                status: user.status
            }))

        return filteredUsers
    }
}
