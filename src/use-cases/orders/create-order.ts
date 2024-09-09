import { OrdersRepository } from '@/repositories/orders-repository'
import { Prisma } from '@prisma/client'

interface CreateOrderUseCaseRequest {
    id_comprador: string
    id_fornecedor: string
    total: number
    itens: Prisma.OrderItemsCreateNestedManyWithoutPedidoInput
}
export class CreateOrderUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute(data: CreateOrderUseCaseRequest): Promise<void> {
        await this.ordersRepository.create(data)
    }
}