import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository"
import { FetchOrdersUseCase } from "../fetch-orders"

export function makeFetchOrdersUseCase() {
    const ordersRepository = new PrismaOrdersRepository
    const useCase = new FetchOrdersUseCase(ordersRepository)

    return useCase
}