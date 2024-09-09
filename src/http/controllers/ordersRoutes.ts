import { FastifyInstance } from "fastify"
import { changeStatus } from "./orders/changeStatus"
import { create } from "./orders/create"
import { fetch } from "./orders/fetch"

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/orders', create)
    app.get('/orders/fetch', fetch)
    app.patch('/orders/change-status', changeStatus)
}