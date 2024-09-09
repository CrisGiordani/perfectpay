import { FastifyInstance } from "fastify"

import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { verifyUserRole } from "@/http/middlewares/verify-user-role"
import { catalogs } from "./companies/catalogs"
import { changeStatus } from "./companies/change-status"
import { create } from "./companies/create"
import { fetch } from "./companies/fetch"
import { nearby } from "./companies/nearby"
import { purchases } from "./companies/purchases"
import { sales } from "./companies/sales"
import { search } from "./companies/search"


export async function companiesRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)

    app.post('/companies', create)


    app.get('/companies', fetch)
    app.get('/companies/search', search)
    app.get('/companies/nearby', nearby)
}

export async function adminCompaniesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    app.addHook('onRequest', verifyUserRole('ADMIN'))

    app.get('/companies/sales', sales)
    app.get('/companies/purchases', purchases)
    app.get('/companies/catalogs', catalogs)

    app.patch('/companies/change-status', changeStatus)
}