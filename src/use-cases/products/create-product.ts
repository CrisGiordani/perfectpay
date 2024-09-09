import { ProductsRepository } from '@/repositories/products-repository'
import { Prisma, Product } from '@prisma/client'

interface CreateProductUseCaseResponse {
    product: Product
}

export class CreateProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({
        ncm,
        cod_barras,
        nome,
        descricao,
        marca,
        embalagem,
        unidade,
        quantidade,
        tags,
        imagens,
        status,
        created_by
    }: Prisma.ProductCreateInput): Promise<CreateProductUseCaseResponse> {
        const product = await this.productsRepository.create({
            ncm,
            cod_barras,
            nome,
            descricao,
            marca,
            embalagem,
            unidade,
            quantidade,
            tags,
            imagens,
            status,
            created_by
        })

        return {
            product,
        }
    }
}
