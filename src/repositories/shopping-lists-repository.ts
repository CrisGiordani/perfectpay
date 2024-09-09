import { Prisma, ShoppingList } from '@prisma/client'

export interface ShoppingListRepository {
    create(data: Prisma.ShoppingListCreateManyInput): Promise<void>
    fetch(id_comprador: string): Promise<ShoppingList[]>
    update(id: string, items: object): Promise<ShoppingList>
    delete(id: string): Promise<void>
}