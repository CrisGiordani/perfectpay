import { makeSearchCompaniesUseCase } from '@/use-cases/companies/factories/make-search-companies'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const searchCompaniesQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {
        q,
        page
    } = searchCompaniesQuerySchema.parse(request.query)

    try {
        const companiesUseCase = makeSearchCompaniesUseCase()
        const companies = await companiesUseCase.execute({
            query: q,
            page
        })

        return reply.status(200).send(companies)
    } catch (err) {

        return reply.status(500).send(err)
    }
}