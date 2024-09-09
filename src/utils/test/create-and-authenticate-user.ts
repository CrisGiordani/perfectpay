import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {

    await request(app.server)
        .post('/users')
        .send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            cpf: '00011122233',
            celular: '11999888777',
            nivel: 1,
            password: '123456',
        })

    const authResponse = await request(app.server)
        .post('/auth')
        .send({
            email: "johndoe@example.com",
            password: "123456"
        })

    const { token } = authResponse.body

    return { token }
}