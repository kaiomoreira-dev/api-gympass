import { makeSearchGym } from '@/usecases/factories/make-search-gym-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SearchGymController (request: FastifyRequest, reply:FastifyReply){
            const searchGym = z.object({
              query: z.string(),
              page: z.coerce.number().min(1).default(1)
            })
      
            const { query, page } = searchGym.parse(request.query)
      
            const serachGymUseCase = await makeSearchGym()

           const gym = await serachGymUseCase.execute({
            query,
            page
            })
            
            return reply.status(200).send(gym)
}
    
