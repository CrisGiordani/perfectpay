import { CompanyCnpjAlreadyExistsError } from '@/use-cases/companies/errors/company-cnpj-already-exists'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'
import { makeCreateCompanyUseCase } from '../../../use-cases/companies/factories/make-create-company'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCompanyBodySchema = z.object({
    nome_fantasia: z.string(),
    razao_social: z.string(),
    fornecedor: z.boolean(),
    comprador: z.boolean(),
    cnpj: z.string(),
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
    status: z.nativeEnum(Status).default('WAITING_APPROVAL'),
    detalhes: z.record(z.unknown()),
  })

  const {
    nome_fantasia,
    razao_social,
    fornecedor,
    comprador,
    cnpj,
    latitude,
    longitude,
    status,
    detalhes
  } = createCompanyBodySchema.parse(request.body)

  try {
    const companiesUseCase = makeCreateCompanyUseCase()

    await companiesUseCase.execute({
      responsavel: request.user.sub,
      nome_fantasia,
      razao_social,
      fornecedor,
      comprador,
      cnpj,
      latitude,
      longitude,
      status,
      detalhes
    })
  } catch (err) {

    if (err instanceof ZodError) {
      return reply.status(400).send({ message: `Erro de validação: ${err}` })
    }

    if (err instanceof CompanyCnpjAlreadyExistsError) {

      return reply.status(409).send({ messsage: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}

