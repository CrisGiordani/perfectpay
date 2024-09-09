import { makeChangeStatusOrderUseCase } from '@/use-cases/orders/factories/make-change-order-status'
import { StatusOrder } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeStatus(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusOrderQuerySchema = z.object({
        id: z.string(),
        status: z.nativeEnum(StatusOrder),
    })

    const {
        id,
        status
    } = changeStatusOrderQuerySchema.parse(request.body)

    try {
        const ordersUseCase = makeChangeStatusOrderUseCase()
        await ordersUseCase.execute({
            id,
            status,
            created_by: request.user.sub
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}