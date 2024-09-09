import { Order, Prisma, StatusOrder } from '@prisma/client'

export interface OrdersRepository {
    create(data: Prisma.OrderCreateManyInput): Promise<void>
    fetch(page?: number): Promise<Order[] | null>
    changeStatus(id_order: string, status_order: StatusOrder, created_by: string): Promise<null>
}