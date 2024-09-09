import { ShoppingListRepository } from '@/repositories/shopping-lists-repository'

interface UpdateShoppingListUseCaseRequest {
    id: string
    items: object
}
export class UpdateShoppingListUseCase {
    constructor(private shoppingListRepository: ShoppingListRepository) {}

    async execute(data: UpdateShoppingListUseCaseRequest): Promise<void> {
        await this.shoppingListRepository.update(data.id, data.items)
    }
}