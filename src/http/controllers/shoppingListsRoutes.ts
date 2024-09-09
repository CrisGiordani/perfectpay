import { FastifyInstance } from "fastify"
import { create } from "./shopping-lists/create"
import { fetch } from "./shopping-lists/fetch"
import { update } from "./shopping-lists/update"

export async function shoppingListsRoutes(app: FastifyInstance) {
    app.post('/shopping-lists', create)
    app.get('/shopping-lists', fetch)
    app.patch('/shopping-lists', update)
}