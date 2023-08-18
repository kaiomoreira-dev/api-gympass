import { InvalidUsersCredentialsError } from '@/usecases/errors/invalid-users-credentials'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { makeGetProfileUser } from '@/usecases/factories/make-get-profiler-user-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetProfileUserController (request: FastifyRequest, reply:FastifyReply){
        try {
            
            const getProfileUserUseCase = await makeGetProfileUser()

            const { sub: id } = request.user // pegando id de dentro do jwt

            const user = await getProfileUserUseCase.execute({ idUsers: id })

            return reply.status(200).send(user)
            
          } catch (error) {
            
          }
}
    
