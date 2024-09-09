// resultCatalogOperation: IncludeCatalogItemUseCaseResponse = {
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


import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';
import { makeIncludeCatalogItensUseCase } from '../../../use-cases/catalogs/factories/make-include-catalog-itens';

export async function include(request: FastifyRequest, reply: FastifyReply) {

    const itemsCreateInput = z.object({
        id_produto: z.string(),
        id_fornecedor: z.string(),
        valor: z.number()
    })

    const items = itemsCreateInput.parse(request.body)

    try {
        const catalogsUseCase = makeIncludeCatalogItensUseCase()
        await catalogsUseCase.execute(items)

    } catch (err) {

        if (err instanceof ZodError) {
            return reply.status(400).send({ message: `Erro de validação: ${err}` })
        }

        return reply.status(500).send(err)
    }

    return reply.status(201).send()
}

