import { InvalidUsersCredentialsError } from '@/usecases/errors/invalid-users-credentials'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { makeAuthenticateUser } from '@/usecases/factories/make-authenticate-user-usecase'
import { makeGetProfileUser } from '@/usecases/factories/make-get-profiler-user-usecase'

import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetProfileUserController (request: FastifyRequest, reply:FastifyReply){
        try {
            
            const getProfileUserUseCase = await makeGetProfileUser()

            const { sub: id } = request.user // pegando id de dentro do jwt

            const user = await getProfileUserUseCase.execute({ idUsers: id })

            return reply.status(200).send(user)
            
          } catch (error) {
            
          }
}
    
