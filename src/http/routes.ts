import { FastifyInstance } from 'fastify'
import { RegisterUserController } from './controller/users/register-user-controller'
import { AuthenticateUserController } from './controller/users/authenticate-users-controller'
import { GetProfileUserController } from './controller/users/get-profile.users-controller'
import { veridyJWT } from './middlewares/verify-jwt'
export async function usersRoutes(fastifyApp: FastifyInstance) {
    // register user
    fastifyApp.post('/', RegisterUserController)

    // login user
    fastifyApp.post('/session', AuthenticateUserController)

    // --- Routes Authenticate --- //
    // get profile
    fastifyApp.get('/me', {onRequest:[veridyJWT]}, GetProfileUserController)
}
