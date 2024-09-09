import { FastifyInstance } from "fastify"

import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { verifyUserRole } from "../middlewares/verify-user-role"
import { changeStatus } from "./products/change-status"
import { create } from "./products/create"
import { fetch } from "./products/fetch"

export async function productsRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)

    app.post('/products', create)
    app.get('/products', fetch)
}

export async function adminProductsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    app.addHook('onRequest', verifyUserRole('ADMIN'))

    app.patch('/products/change-status', changeStatus)
}