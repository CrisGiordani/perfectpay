import { makeFetchCompaniesUseCase } from '@/use-cases/companies/factories/make-fetch-companies'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    try {
        const companiesUseCase = makeFetchCompaniesUseCase()

        const companies = await companiesUseCase.execute()

        return reply.status(200).send(companies)
    } catch (err) {

        return reply.status(500).send(err)
    }
}