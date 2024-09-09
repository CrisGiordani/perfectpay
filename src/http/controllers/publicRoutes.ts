import { FastifyInstance } from "fastify"
import { authenticate } from "./public/authenticate"
import { refresh } from "./public/refresh"
import { register } from "./public/register"
import { status } from "./public/status"

export async function publicRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/auth', authenticate)
    app.get('/status', status)

    app.patch('/token/refresh', refresh)
}