import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('Should be able to authenticate', async () => {
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

        const response = await request(app.server)
            .post('/auth')
            .send({
                email: "johndoe@example.com",
                password: "123456"
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})