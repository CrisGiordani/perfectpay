import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface FetchProductsUseCaseResponse {
    products: Product[] | null
}

export class FetchProductsUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute(): Promise<FetchProductsUseCaseResponse> {
        const products = await this.productsRepository.fetch()

        return {
            products,
        }
    }
}
