import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ShoppingListRepository } from "../shopping-lists-repository";

export class PrismaShoppingListRepository implements ShoppingListRepository {
    async create(data: Prisma.ShoppingListCreateManyInput) {
        try {
            await prisma.shoppingList.create({ data });
        } catch (err) {
            throw new Error(`Erro ao criar lista de compras: ${err}`);
        }
    }

    async fetch(id_comprador: string) {
        const shopping_list = await prisma.shoppingList.findMany({
            where: { id_comprador }
        })
        return shopping_list
    }

    async update(id: string, items: string[]) {
        const shopping_list = await prisma.shoppingList.update({
            where: { id }, data: { items }
        })
        return shopping_list
    }

    async delete(id: string) {
        const shopping_list = await prisma.shoppingList.delete({
            where: { id }
        })
        return
    }
}