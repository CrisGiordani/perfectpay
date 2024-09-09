import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ChangeRoleUserUseCase } from "../change-user-role"

export function makeChangeRoleUserUseCase() {
    const usersRepository = new PrismaUsersRepository
    const useCase = new ChangeRoleUserUseCase(usersRepository)

    return useCase
}