import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository"
import { CreateOrderUseCase } from "../create-order"

export function makeCreateOrderUseCase() {
    const ordersRepository = new PrismaOrdersRepository
    const useCase = new CreateOrderUseCase(ordersRepository)

    return useCase
}