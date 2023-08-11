import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { usersRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import "dotenv/config"

export const appFastify = fastify()

appFastify.register(fastifyJwt,
    {
        secret: env.JWT_SECRET
    })


appFastify.register(usersRoutes,{
    prefix: 'api/users'
})


appFastify.setErrorHandler((error:FastifyError, _request:FastifyRequest, reply: FastifyReply)=>{
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