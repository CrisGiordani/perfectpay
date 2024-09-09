import { makeFetchCatalogByCompanyUseCase } from '@/use-cases/catalogs/factories/make-fetch-catalog-by-company'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {

    const makeFetchCatalogByCompanyQuerySchema = z.object({
        id_fornecedores: z.array(z.string()).refine(data => data.length > 0, {
            message: 'Ao menos um fornecedor precisa ser enviado'
        })
    })

    const { id_fornecedores } = makeFetchCatalogByCompanyQuerySchema.parse(request.body)

    try {
        const CatalogsUseCase = makeFetchCatalogByCompanyUseCase()

        console.log(id_fornecedores)
        const Items = await CatalogsUseCase.execute(id_fornecedores)

        return reply.status(200).send(Items)
    } catch (err) {

        return reply.status(500).send(err)
    }
}