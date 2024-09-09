import { ShoppingListRepository } from '@/repositories/shopping-lists-repository'

interface CreateShoppingListUseCaseRequest {
    id_comprador: string
    items: string[]
}
export class CreateShoppingListUseCase {
    constructor(private shoppingListRepository: ShoppingListRepository) {}

    async execute(data: CreateShoppingListUseCaseRequest): Promise<void> {
        await this.shoppingListRepository.create(data)
    }
}