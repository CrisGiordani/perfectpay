import { makeGetUserProfileUseCase } from '@/use-cases/users/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const getUserQuerySchema = z.object({
        id: z.string()
    })

    const {
        id
    } = getUserQuerySchema.parse(request.query)

    try {
        const getUserProfile = makeGetUserProfileUseCase()

        const { user } = await getUserProfile.execute({
            userId: id
        })

        return reply.status(200).send({
            user: {
                ...user,
                password_hash: undefined
            }
        })
    } catch (err) {
        reply.status(400).send({ message: 'User not found.' })
    }
}
