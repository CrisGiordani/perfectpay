import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ChangeStatusUserUseCase } from "../change-user-status"

export function makeChangeStatusUserUseCase() {
    const usersRepository = new PrismaUsersRepository
    const useCase = new ChangeStatusUserUseCase(usersRepository)

    return useCase
}