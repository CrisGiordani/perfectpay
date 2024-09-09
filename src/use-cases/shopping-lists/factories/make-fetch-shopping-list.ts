import { PrismaShoppingListRepository } from "@/repositories/prisma/prisma-shopping-lists-repository"
import { FetchShoppingListUseCase } from "../fetch-shopping-list"

export function makeFetchShoppingListUseCase() {
    const shoppingListRepository = new PrismaShoppingListRepository
    const useCase = new FetchShoppingListUseCase(shoppingListRepository)

    return useCase
}