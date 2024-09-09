import { PrismaShoppingListRepository } from "@/repositories/prisma/prisma-shopping-lists-repository"
import { UpdateShoppingListUseCase } from "../update-shopping-list"

export function makeUpdateShoppingListUseCase() {
    const shoppingListRepository = new PrismaShoppingListRepository
    const useCase = new UpdateShoppingListUseCase(shoppingListRepository)

    return useCase
}