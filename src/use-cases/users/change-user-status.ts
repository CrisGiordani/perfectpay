import { UsersRepository } from '@/repositories/users-repository'
import { Status } from '@prisma/client'

interface ChangeStatusUserUseCaseRequest {
    id: string,
    status: Status
}
export class ChangeStatusUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        id,
        status
    }: ChangeStatusUserUseCaseRequest): Promise<null> {
        await this.usersRepository.changeStatus(id, status)

        return null
    }
}
