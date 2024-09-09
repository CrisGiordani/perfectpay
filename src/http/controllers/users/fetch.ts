import { makeFetchUsersUseCase } from '@/use-cases/users/factories/make-fetch-users'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    try {
        const usersUseCase = makeFetchUsersUseCase()

        const users = await usersUseCase.execute()

        return reply.status(200).send(users)
    } catch (err) {

        return reply.status(500).send(err)
    }
}