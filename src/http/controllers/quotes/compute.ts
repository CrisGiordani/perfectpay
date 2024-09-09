import { makeComputeQuoteUseCase } from '@/use-cases/quotes/factories/make-compute-quote'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function compute(request: FastifyRequest, reply: FastifyReply) {

    const computeQuoteRequest = z.object({
        tag: z.string(),
        tags: z.array(z.string()),
        qnt: z.number(),
        unidade: z.string(),
    })

    try {
        const data = computeQuoteRequest.parse(request.body)
        const quotesUseCase = makeComputeQuoteUseCase()
        const products = await quotesUseCase.execute(data)

        return reply.status(200).send(products)
    } catch (err) {
        if (err instanceof ZodError) {
            return reply.status(400).send({
                message: `Erro de validação:  ${JSON.stringify(err.errors)}`
            })
        }
        return reply.status(500).send(err)
    }
}