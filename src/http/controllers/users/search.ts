import { makeSearchUsersUseCase } from '@/use-cases/users/factories/make-search-users'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const searchUsersQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {
        q,
        page
    } = searchUsersQuerySchema.parse(request.query)

    try {
        const usersUseCase = makeSearchUsersUseCase()
        const users = await usersUseCase.execute({
            query: q,
            page
        })

        return reply.status(200).send(users)
    } catch (err) {

        return reply.status(500).send(err)
    }
}