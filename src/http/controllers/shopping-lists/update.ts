import { makeUpdateShoppingListUseCase } from '@/use-cases/shopping-lists/factories/make-update-shopping-list'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {

    const updateShoppingListBodySchema = z.object({
        id: z.string(),
        items: z.array(z.string())
    })

    const {
        id,
        items
    } = updateShoppingListBodySchema.parse(request.body)

    try {
        const ordersUseCase = makeUpdateShoppingListUseCase()
        await ordersUseCase.execute({
            id,
            items
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}