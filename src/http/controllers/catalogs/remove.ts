// resultCatalogOperation: RemoveCatalogItemUseCaseResponse = {
//     included: [],
//     failed: []
// }
// async include(data: CatalogItem[]) {
//     data.forEach(item => {
//         const newItem = await prisma.catalog.create(data)

//         this.resultCatalogOperation.included.push(item.id_produto)
//     } catch (err) {
//         this.resultCatalogOperation.failed.push(item.id_produto)
//     }
// });
// return this.resultCatalogOperation
// }


import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'
import { makeRemoveCatalogItensUseCase } from '../../../use-cases/catalogs/factories/make-remove-catalog-itens'

export async function remove(request: FastifyRequest, reply: FastifyReply) {

    const idsRemoveManyArgs = z.object({
        ids: z.array(z.string())
    })

    const { ids } = idsRemoveManyArgs.parse(request.body)

    try {
        const catalogsUseCase = makeRemoveCatalogItensUseCase()
        await catalogsUseCase.execute(ids)

    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }

        return reply.status(500).send()
    }

    return reply.status(201).send()
}

