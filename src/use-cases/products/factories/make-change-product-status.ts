import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { ChangeStatusProductUseCase } from "../change-product-status"

export function makeChangeStatusProductUseCase() {
    const productsRepository = new PrismaProductsRepository
    const useCase = new ChangeStatusProductUseCase(productsRepository)

    return useCase
}