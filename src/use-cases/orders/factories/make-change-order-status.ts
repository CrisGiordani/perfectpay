import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository"
import { ChangeStatusOrderUseCase } from "../change-order-status"

export function makeChangeStatusOrderUseCase() {
    const ordersRepository = new PrismaOrdersRepository
    const useCase = new ChangeStatusOrderUseCase(ordersRepository)

    return useCase
}