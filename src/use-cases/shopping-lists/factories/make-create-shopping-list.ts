import { PrismaShoppingListRepository } from "@/repositories/prisma/prisma-shopping-lists-repository"
import { CreateShoppingListUseCase } from "../create-shopping-list"

export function makeCreateShoppingListUseCase() {
    const shoppingListRepository = new PrismaShoppingListRepository
    const useCase = new CreateShoppingListUseCase(shoppingListRepository)

    return useCase
}