import { OrdersRepository } from '@/repositories/orders-repository'
import { StatusOrder } from '@prisma/client'

interface ChangeStatusOrderUseCaseRequest {
    id: string,
    status: StatusOrder
    created_by: string
}
export class ChangeStatusOrderUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({
        id,
        status,
        created_by
    }: ChangeStatusOrderUseCaseRequest): Promise<null> {
        await this.ordersRepository.changeStatus(id, status, created_by)

        return null
    }
}
