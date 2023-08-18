import { makeSearchNearbyGym } from '@/usecases/factories/make-search-nearby-gym-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SearchNearbyGymController (request: FastifyRequest, reply:FastifyReply){
            const searchNearbyUser = z.object({
              latitude: z.coerce.number().refine(value =>{
                return Math.abs(value) <= 90
              }),
              longitude: z.coerce.number().refine(value =>{
                return Math.abs(value) <= 180
              })
            })
      
            const { latitude, longitude } = searchNearbyUser.parse(request.query)
      

            const searchNearbyGymUseCase = await makeSearchNearbyGym()

            const gyms = await searchNearbyGymUseCase.execute({
              userLatitude: latitude,
              userLongitude: longitude
            })
            
            return reply.status(200).send(gyms)
}
    
