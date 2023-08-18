import { UserAlreadyExistsError } from '@/usecases/errors/users-already-exists-error'
import { makeRegisteUser } from '@/usecases/factories/make-register-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterUserController (request: FastifyRequest, reply:FastifyReply){
        try {
            const userSchema = z.object({
              name: z.string(),
              email: z.string().email(), // validação de email
              password: z.string().min(6), // mínimo 6 caracteres
            })
      
            const { name, email, password } = userSchema.parse(request.body)
      

            const registerUserUseCase = await makeRegisteUser()

            await registerUserUseCase.execute({name, email,password})
          
            return reply.status(201).send()
            
          } catch (error) {
            if(error instanceof  UserAlreadyExistsError){
              return reply.status(409).send({ message: error.message})
            }
            throw error
          }
}
    
