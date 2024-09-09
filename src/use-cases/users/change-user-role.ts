import { UsersRepository } from '@/repositories/users-repository'
import { Role } from '@prisma/client'

interface ChangeRoleUserUseCaseRequest {
    id: string,
    role: Role
}
export class ChangeRoleUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        id,
        role
    }: ChangeRoleUserUseCaseRequest): Promise<null> {
        await this.usersRepository.changeRole(id, role)

        return null
    }
}
