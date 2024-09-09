import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { verifyUserRole } from "../middlewares/verify-user-role"
import { changeRole } from "./users/change-role"
import { changeStatus } from "./users/change-status"
import { fetch } from "./users/fetch"
import { me } from "./users/me"
import { profile } from "./users/profile"
import { search } from "./users/search"

export async function usersRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)

    app.get('/me', me)
}

export async function adminUsersRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)
    app.addHook('onRequest', verifyUserRole('ADMIN'))

    app.get('/users', fetch)
    app.get('/users/profile', profile)
    app.get('/users/search', search)
    app.patch('/users/change-role', changeRole)
    app.patch('/users/change-status', changeStatus)
}