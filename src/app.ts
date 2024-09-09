import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { catalogRoutes } from './http/controllers/catalogRoutes';
import { adminCompaniesRoutes, companiesRoutes } from './http/controllers/companiesRoutes';
import { ordersRoutes } from './http/controllers/ordersRoutes';
import { adminProductsRoutes, productsRoutes } from './http/controllers/productsRoutes';
import { publicRoutes } from './http/controllers/publicRoutes';
import { quotesRoutes } from './http/controllers/quotesRoutes';
import { shoppingListsRoutes } from './http/controllers/shoppingListsRoutes';
import { adminUsersRoutes, usersRoutes } from './http/controllers/usersRoutes';

export const app = fastify()

app.register(cors, {
    origin: env.CORS,
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '7d'
    }
})

app.register(fastifyCookie)

app.register(publicRoutes)
app.register(usersRoutes)
app.register(adminUsersRoutes)
app.register(companiesRoutes)
app.register(adminCompaniesRoutes)
app.register(productsRoutes)
app.register(adminProductsRoutes)
app.register(catalogRoutes)
app.register(ordersRoutes)
app.register(quotesRoutes)
app.register(shoppingListsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})