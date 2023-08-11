import { InvalidUsersCredentialsError } from '@/usecases/errors/invalid-users-credentials'
import { makeAuthenticateUser } from '@/usecases/factories/make-authenticate-user-usecase'

import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateUserController (request: FastifyRequest, reply:FastifyReply){
        try {
            const userSchema = z.object({
              email: z.string().email(), // validação de email
              password: z.string().min(6), // mínimo 6 caracteres
            })
      
            const { email, password } = userSchema.parse(request.body)

            
            
            const authenticateUser = await makeAuthenticateUser()
            
            const {user} = await authenticateUser.execute({email, password})
            
            const token = await reply.jwtSign(
              {},
              {
                sign: {
                  sub: user.id
                }
              }
            ) 
            return reply.status(200).send({token})
            
          } catch (error) {
            if(error instanceof  InvalidUsersCredentialsError){
              return reply.status(409).send({ message: error.message})
            }
            throw error
          }
}
    
