import { makeChangeStatusProductUseCase } from '@/use-cases/products/factories/make-change-product-status'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeStatus(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusProductQuerySchema = z.object({
        id: z.string(),
        status: z.nativeEnum(Status),
    })

    const {
        id,
        status
    } = changeStatusProductQuerySchema.parse(request.body)

    try {
        const productsUseCase = makeChangeStatusProductUseCase()
        await productsUseCase.execute({
            id,
            status
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}