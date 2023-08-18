import { makeCheckIn } from '@/usecases/factories/make-check-in-usecase'
import { validateCheckIn } from '@/usecases/factories/make-validate-check-in-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ValidateCheckIn(request: FastifyRequest, reply:FastifyReply){
            const checkInSchema = z.object({
              idCheckIn: z.string().uuid()
            })
      
            const { idCheckIn } = checkInSchema.parse(request.params)

            const validateCheckInUseCase = await validateCheckIn()
          
            await validateCheckInUseCase.execute({
                idCheckIn
            })
            
            return reply.status(204).send()
}
    
