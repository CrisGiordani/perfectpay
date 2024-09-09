import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface FetchOrdersUseCaseResponse {
    orders: Order[] | null
}

export class FetchOrdersUseCase {
    constructor(private ordersRepository: OrdersRepository) {}

    async execute(): Promise<FetchOrdersUseCaseResponse> {
        const orders = await this.ordersRepository.fetch()

        return {
            orders,
        }
    }
}
