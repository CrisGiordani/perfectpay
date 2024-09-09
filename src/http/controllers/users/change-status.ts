import { makeChangeStatusUserUseCase } from '@/use-cases/users/factories/make-change-status-user'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeStatus(request: FastifyRequest, reply: FastifyReply) {

    const changeStatusUserQuerySchema = z.object({
        id: z.string(),
        status: z.nativeEnum(Status),
    })

    const {
        id,
        status
    } = changeStatusUserQuerySchema.parse(request.body)

    try {
        const usersUseCase = makeChangeStatusUserUseCase()
        await usersUseCase.execute({
            id,
            status
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}