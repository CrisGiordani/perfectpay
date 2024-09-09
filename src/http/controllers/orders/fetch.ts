import { makeFetchOrdersUseCase } from '@/use-cases/orders/factories/make-fetch-orders'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {

    const makeFetchOrdersByCompanyQuerySchema = z.object({
        id_comprador: z.string()
    })

    const { id_comprador } = makeFetchOrdersByCompanyQuerySchema.parse(request.query)

    try {
        const ordersUseCase = makeFetchOrdersUseCase()

        const { orders } = await ordersUseCase.execute()

        return reply.status(200).send(orders)
    } catch (err) {

        return reply.status(500).send(err)
    }
}