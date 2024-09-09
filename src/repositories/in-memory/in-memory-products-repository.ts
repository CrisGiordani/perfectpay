import { Prisma, Product, Status } from "@prisma/client";
import { randomUUID } from "crypto";
import { ProductsRepository } from "../products-repository";

export class InMemoryProductsRepository implements ProductsRepository {
    public items: Product[] = []

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        const product = {
            id: randomUUID(),
            ncm: data.ncm || null,
            cod_barras: data.cod_barras || null,
            nome: data.nome,
            marca: data.marca,
            embalagem: data.embalagem,
            unidade: data.unidade,
            quantidade: data.quantidade,
            status: data.status || 'WAITING_APPROVAL',
            created_by: "user-01",
            aproved_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        }

        this.items.push(product)

        return product
    }

    async fetch(page: number) {
        const products = this.items.sort()
            .slice((page - 1) * 20, page * 20)

        if (!products) {
            return null
        }
        return products
    }

    async changeStatus(id: string, status: Status) {
        const user = this.items.map(product => {
            if (product.id === id) {
                return { ...product, status }
            }
        })

        return null
    }
}