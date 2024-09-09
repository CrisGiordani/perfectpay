import { ProductsRepository } from '@/repositories/products-repository'
import { Status } from '@prisma/client'

interface ChangeStatusProductUseCaseRequest {
    id: string,
    status: Status
}
export class ChangeStatusProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({
        id,
        status
    }: ChangeStatusProductUseCaseRequest): Promise<null> {
        await this.productsRepository.changeStatus(id, status)

        return null
    }
}
