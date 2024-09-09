import { makeCreateOrderUseCase } from '@/use-cases/orders/factories/make-create-order';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const pedidoSchema = z.object({
        id_comprador: z.string(),
        id_fornecedor: z.string(),
        total: z.number(),
        itens: z.object({
            createMany: z.object({
                data: z.array(
                    z.object({
                        id_produto: z.string(),
                        valor: z.number(),
                        qtd: z.number()
                    })
                )
            })
        })
    });

    const data = pedidoSchema.parse(request.body);

    try {
        const ordersUseCase = makeCreateOrderUseCase()

        await ordersUseCase.execute(data)
    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }

        return reply.status(500).send(err)
    }

    return reply.status(201).send()
}