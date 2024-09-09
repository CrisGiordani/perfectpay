import { FastifyInstance } from "fastify"
import { compute } from "./quotes/compute"
import { getTags } from "./quotes/get-tags"


export async function quotesRoutes(app: FastifyInstance) {
    app.post('/quotes/compute', compute)
    app.get('/quotes/get-tags', getTags)
}