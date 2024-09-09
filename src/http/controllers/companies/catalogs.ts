import { makeListCompanyCatalogsUseCase } from '@/use-cases/companies/factories/make-list-company-catalogs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function catalogs(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusCompanyParamsSchema = z.object({
        id: z.string()
    })

    const { id } = changeStatusCompanyParamsSchema.parse(request.query)

    try {
        const companiesUseCase = makeListCompanyCatalogsUseCase()
        const catalogs = await companiesUseCase.execute({ id })

        return reply.status(200).send(catalogs)
    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }
        return reply.status(500).send(err)
    }
}