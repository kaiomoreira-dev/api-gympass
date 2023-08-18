import { FastifyInstance } from 'fastify'
import { CreateGymController } from './create/create-gym-controller'
import { veridyJWT } from '@/http/middlewares/verify-jwt'
import { SearchNearbyGymController } from './nearby/nearby-gym-controller'
import { SearchGymController } from './search/search-gym-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(fastifyApp: FastifyInstance) {
    // middle para todas as rotas abaixo
    fastifyApp.addHook('onRequest', veridyJWT)

    // create gym
    fastifyApp.post('/', {onRequest:[verifyUserRole('ADMIN')]},CreateGymController)

    // search nearby gym
    fastifyApp.get('/nearby', SearchNearbyGymController)

    // search gym
    fastifyApp.get('/search', SearchGymController)
}
