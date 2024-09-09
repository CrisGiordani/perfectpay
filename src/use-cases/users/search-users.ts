import { UsersRepository } from '@/repositories/users-repository'

interface SearchUsersUseCaseRequest {
    query: string
    page: number
}

export class SearchUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        query,
        page,
    }: SearchUsersUseCaseRequest): Promise<Object[]> {
        const users = await this.usersRepository.searchMany(query, page)

        if (!users) return [{}]

        const filteredUsers = users
            .filter(user => user.status === 'ACTIVE')
            .map(user => ({
                id: user.id,
                nome: user.nome,
                email: user.email,
                celular: user.celular,
                cpf: user.cpf,
            }))

        return filteredUsers
    }
}
