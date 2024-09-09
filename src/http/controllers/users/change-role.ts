import { makeChangeRoleUserUseCase } from '@/use-cases/users/factories/make-change-role-user'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeRole(request: FastifyRequest, reply: FastifyReply) {

    const changeRoleUserQuerySchema = z.object({
        id: z.string(),
        role: z.nativeEnum(Role),
    })

    const {
        id,
        role
    } = changeRoleUserQuerySchema.parse(request.body)

    try {
        const usersUseCase = makeChangeRoleUserUseCase()
        await usersUseCase.execute({
            id,
            role
        })

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send(err)
    }
}