import { makeListCompanyPurchasesUseCase } from '@/use-cases/companies/factories/make-list-company-purchases'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function purchases(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusCompanyParamsSchema = z.object({
        id: z.string()
    })

    const { id } = changeStatusCompanyParamsSchema.parse(request.query)

    try {
        const companiesUseCase = makeListCompanyPurchasesUseCase()
        const orders = await companiesUseCase.execute({ id })

        return reply.status(200).send(orders)
    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }
        return reply.status(500).send(err)
    }
}