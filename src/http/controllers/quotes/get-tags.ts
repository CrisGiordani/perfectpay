import { makeGetTagsQuoteUseCase } from '@/use-cases/quotes/factories/make-get-tags-quote'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function getTags(request: FastifyRequest, reply: FastifyReply) {

    const getTagsQuoteRequest = z.object({
        tag: z.string()
    })

    try {
        const tag = getTagsQuoteRequest.parse(request.query)
        const quotesUseCase = makeGetTagsQuoteUseCase()
        const tags = await quotesUseCase.execute(tag)

        return reply.status(200).send(tags)
    } catch (err) {
        if (err instanceof ZodError) {
            return reply.status(400).send({
                message: `Erro de validação:  ${JSON.stringify(err.errors)}`
            })
        }
        return reply.status(500).send(err)
    }
}