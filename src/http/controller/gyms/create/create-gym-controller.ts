import { makeCreateGym } from '@/usecases/factories/make-create-gym-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateGymController (request: FastifyRequest, reply:FastifyReply){
            const gymSchema = z.object({
              name: z.string(),
              description: z.string().nullable(), 
              phone: z.string().nullable(),
              latitude: z.number().refine(value =>{
                return Math.abs(value) <= 90
              }),
              longitude: z.number().refine(value =>{
                return Math.abs(value) <= 180
              })
            })
      
            const { name, description, phone, latitude, longitude } = gymSchema.parse(request.body)
      

            const createGymUseCase = await makeCreateGym()

            await createGymUseCase.execute({
              name, 
              description, 
              phone, 
              latitude, 
              longitude 
            })
            
            return reply.status(201).send()
}
    
