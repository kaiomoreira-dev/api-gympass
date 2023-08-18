import { makeCheckIn } from '@/usecases/factories/make-check-in-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function MakeCheckIn(request: FastifyRequest, reply:FastifyReply){
            const checkInSchema = z.object({
              userId: z.string(),
              gymId: z.string(),
              latitude: z.number().refine(value =>{
                return Math.abs(value) <= 90
              }),
              longitude: z.number().refine(value =>{
                return Math.abs(value) <= 180
              })
            })
      
            const { userId, gymId, latitude, longitude} = checkInSchema.parse(request.body)

            const createCheckInUseCase = await makeCheckIn()
          
            await createCheckInUseCase.execute({
             idUser: userId,
             idGym: gymId,
             userLatitude: latitude,
             userLongitude: longitude
            })
            
            return reply.status(204).send()
}
    
