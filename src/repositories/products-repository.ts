import { Prisma, Product, Status } from '@prisma/client'

export interface ProductsRepository {
    create(data: Prisma.ProductCreateInput): Promise<Product>
    findById(id: string): Promise<Product | null>
    fetch(page?: number): Promise<Product[] | null>
    changeStatus(id: string, status: Status): Promise<null>
}
