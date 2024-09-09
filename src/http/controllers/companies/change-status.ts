import { makeChangeStatusCompanyUseCase } from '@/use-cases/companies/factories/make-change-company-status'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeStatus(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusCompanyQuerySchema = z.object({
        id: z.string(),
        status: z.nativeEnum(Status),
    })

    const {
        id,
        status
    } = changeStatusCompanyQuerySchema.parse(request.body)

    try {
        const companiesUseCase = makeChangeStatusCompanyUseCase()
        await companiesUseCase.execute({
            id,
            status
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}