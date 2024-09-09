import { makeFetchProductsUseCase } from '@/use-cases/products/factories/make-fetch-products'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    try {
        const productsUseCase = makeFetchProductsUseCase()

        const { products } = await productsUseCase.execute()

        return reply.status(200).send(products)
    } catch (err) {

        return reply.status(500).send(err)
    }
}