import { makeFetchNearByCompaniesUseCase } from '@/use-cases/companies/factories/make-fetch-near-by-companies'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {

    const nearbyCompaniesQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyCompaniesQuerySchema.parse(request.query)

    const fetchNearByCompaniesUseCase = makeFetchNearByCompaniesUseCase()
    const companies = await fetchNearByCompaniesUseCase.execute({
        latitude,
        longitude
    })

    return reply.status(200).send({
        companies
    })

}