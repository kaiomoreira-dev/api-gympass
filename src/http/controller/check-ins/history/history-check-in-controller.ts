import { makeCheckIn } from '@/usecases/factories/make-check-in-usecase'
import { makeHistoryCheckIn } from '@/usecases/factories/make-history-check-in-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function HistoryCheckIn(request: FastifyRequest, reply:FastifyReply){
            const historyGymSchema = z.object({
                page: z.coerce.number().min(1).default(1)
            })
      
            const { page } = historyGymSchema.parse(request.query)

            const historyCheckInUseCase = await makeHistoryCheckIn()

            const {checkIns} = await historyCheckInUseCase.execute({
                idUser: request.user.sub,
                page
            })
            
            return reply.status(200).send({checkIns})
}
    
