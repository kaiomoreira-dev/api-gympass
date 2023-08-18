import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { usersRoutes } from './http/controller/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import "dotenv/config"
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkInRoutes } from './http/controller/check-ins/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'

export const fastifyApp = fastify()

fastifyApp.register(fastifyCors, {
    origin: true,
    credentials: true,
  })
  
fastifyApp.register(fastifyJwt,
    {
        secret: env.JWT_SECRET,
        cookie:{
            cookieName: 'refreshToken',
            signed: false
        },
        sign:{
            expiresIn: '10m'
        },
        
    })

fastifyApp.register(fastifyCookie)

fastifyApp.register(usersRoutes,{
    prefix: 'api/users'
})

fastifyApp.register(gymsRoutes,{
    prefix: 'api/gyms'
})

fastifyApp.register(checkInRoutes,{
    prefix: 'api/check-ins'
})


fastifyApp.setErrorHandler((error:FastifyError, _request:FastifyRequest, reply: FastifyReply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation error', issues: error.format()})
    }

    if(env.NODE_ENV !== 'prod'){
        console.log(error)
    }else{
        // Aqui adicionar monitoramento de log em produção
        // como Sentry/NewRelic/DataDog
    }

    return reply.status(500).send({message: error.message})
})