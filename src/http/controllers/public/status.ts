import { FastifyReply, FastifyRequest } from 'fastify'
import { makeStatusUseCase } from '../../../use-cases/public/factories/make-status-use-case'

export async function status(request: FastifyRequest, reply: FastifyReply) {
  try {
    const statusUseCase = makeStatusUseCase()

    await statusUseCase.execute()
  } catch (err) {
    throw err
  }

  return reply.status(200).send('🚀 HTTP Server Running!')
}
