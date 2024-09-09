import { makeFetchShoppingListUseCase } from '@/use-cases/shopping-lists/factories/make-fetch-shopping-list'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {

    const makeFetchShoppingListByCompanyQuerySchema = z.object({
        id_comprador: z.string()
    })

    const { id_comprador } = makeFetchShoppingListByCompanyQuerySchema.parse(request.query)

    try {
        const ordersUseCase = makeFetchShoppingListUseCase()
        const shopping_list = await ordersUseCase.execute(id_comprador)

        return reply.status(200).send(shopping_list)
    } catch (err) {
        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }
        return reply.status(500).send(err)
    }
}