import { UserCelularAlreadyExistsError } from '@/use-cases/public/errors/user-celular-already-exists'
import { UserCpfAlreadyExistsError } from '@/use-cases/public/errors/user-cpf-already-exists'
import { UserEmailAlreadyExistsError } from '@/use-cases/public/errors/user-email-already-exists'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'
import { makeRegisterUseCase } from '../../../use-cases/public/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    celular: z.string(),
    cpf: z.string(),
    password: z.string().min(6),
    role: z.nativeEnum(Role).default('CLIENT')
  })

  const { nome, email, celular, cpf, password, role } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      nome,
      email,
      celular,
      cpf,
      password,
      role
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({ message: `Erro de validação: ${err}` })
    }

    if (err instanceof UserEmailAlreadyExistsError) {
      return reply.status(409).send({ messsage: err.message })
    }

    if (err instanceof UserCpfAlreadyExistsError) {
      return reply.status(409).send({ messsage: err.message })
    }

    if (err instanceof UserCelularAlreadyExistsError) {
      return reply.status(409).send({ messsage: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
