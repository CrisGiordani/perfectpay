
import { makeCreateProductUseCase } from '@/use-cases/products/factories/make-create-product'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createProductBodySchema = z.object({
        ncm: z.string().default(""),
        cod_barras: z.string().default(""),
        nome: z.string(),
        descricao: z.string(),
        marca: z.string(),
        embalagem: z.string(),
        unidade: z.string(),
        quantidade: z.number(),
        tags: z.array(z.string()),
        imagens: z.array(z.string()),
        status: z.nativeEnum(Status).default('WAITING_APPROVAL'),
        created_by: z.string()
    })

    const {
        ncm,
        cod_barras,
        nome,
        descricao,
        marca,
        embalagem,
        unidade,
        quantidade,
        tags,
        status,
        imagens,
    } = createProductBodySchema.parse(request.body)

    try {
        const productsUseCase = makeCreateProductUseCase()

        await productsUseCase.execute({
            ncm,
            cod_barras,
            nome,
            descricao,
            marca,
            embalagem,
            unidade,
            quantidade,
            tags,
            imagens,
            status,
            created_by: request.user.sub
        })
    } catch (err) {

        return reply.status(500).send(err)
    }

    return reply.status(201).send()
}

