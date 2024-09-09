import { FastifyInstance } from "fastify"
import { fetch } from "./catalogs/fetch"
import { include } from "./catalogs/include"
import { remove } from "./catalogs/remove"


export async function catalogRoutes(app: FastifyInstance) {
    app.post('/catalogs/include', include)
    app.delete('/catalogs/remove', remove)
    app.post('/catalogs', fetch)

}