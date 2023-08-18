import { makeCreateGym } from '@/usecases/factories/make-create-gym-usecase'
import { makeGetMetricsCheckIns } from '@/usecases/factories/make-get-metric-check-in-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetMetricsCheckIn(request: FastifyRequest, reply:FastifyReply){
            const paramsMetricsSchema = z.object({
              idUser: z.string().uuid()
            })
      
            const { idUser } = paramsMetricsSchema.parse(request.params)

            const getMetricsCheckInUseCase = await makeGetMetricsCheckIns()

            const {checkInCount} = await getMetricsCheckInUseCase.execute({
                idUser
            })
            
            return reply.status(200).send({checkInCount})
}
    
