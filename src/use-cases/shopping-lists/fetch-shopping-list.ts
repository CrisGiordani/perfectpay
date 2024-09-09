import { ShoppingListRepository } from '@/repositories/shopping-lists-repository'
import { ShoppingList } from '@prisma/client'

export class FetchShoppingListUseCase {
    constructor(private shoppingListRepository: ShoppingListRepository) {}

    async execute(id_comprador: string): Promise<ShoppingList[] | null> {
        return await this.shoppingListRepository.fetch(id_comprador)
    }
}