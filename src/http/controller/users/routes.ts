import { FastifyInstance } from 'fastify'
import { AuthenticateUserController } from './login/authenticate-users-controller'
import { veridyJWT } from '../../middlewares/verify-jwt'
import { RegisterUserController } from './register/register-user-controller'
import { GetProfileUserController } from './get-profile/get-profile.users-controller'
import { RefreshToken } from './refresh-token/refresh-token-controller'
export async function usersRoutes(fastifyApp: FastifyInstance) {
    // register user
    fastifyApp.post('/', RegisterUserController)

    // login user
    fastifyApp.post('/session', AuthenticateUserController)

    // --- Routes Authenticate --- //
    // get profile
    fastifyApp.get('/me', {onRequest:[veridyJWT]}, GetProfileUserController)

    // refresh token
    fastifyApp.patch('/token/refresh', RefreshToken)
}
