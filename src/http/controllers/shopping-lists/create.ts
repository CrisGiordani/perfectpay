import { makeCreateShoppingListUseCase } from '@/use-cases/shopping-lists/factories/make-create-shopping-list';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const shoppingListSchema = z.object({
        id_comprador: z.string(),
        items: z.array(z.string()),
    });

    const data = shoppingListSchema.parse(request.body);
    console.log("data", data)
    try {
        const shoppingListUseCase = makeCreateShoppingListUseCase()

        await shoppingListUseCase.execute(data)
    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }

        return reply.status(500).send(err)
    }

    return reply.status(201).send()
}