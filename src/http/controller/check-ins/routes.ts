import { FastifyInstance } from 'fastify'
import { veridyJWT } from '@/http/middlewares/verify-jwt'
import { MakeCheckIn } from './check-in/make-check-in-controller'
import { HistoryCheckIn } from './history/history-check-in-controller'
import { ValidateCheckIn } from './validate/validate-check-in-controller'
import { GetMetricsCheckIn } from './get-metrics/get-metrics-users-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInRoutes(fastifyApp: FastifyInstance) {
    // middle para todas as rotas abaixo
    fastifyApp.addHook('onRequest', veridyJWT)

    // make gym
    fastifyApp.post('/', MakeCheckIn)

    // validate gym
    fastifyApp.patch('/:idCheckIn/validate', {onRequest:[verifyUserRole('ADMIN')]},ValidateCheckIn)

    // get history for check-ins
    fastifyApp.get('/history', HistoryCheckIn)

    // get metrics for check-ins
    fastifyApp.get('/:idUser/metrics', GetMetricsCheckIn)
}
