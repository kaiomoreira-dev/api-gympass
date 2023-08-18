import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import request from 'supertest'

export async function createAndAuthenticateUser(fastifyApp: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data:{
            name: 'Kaio Moreira',
            email: 'kaio@gympass.test',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
        
    })

    const response = await request(fastifyApp.server).post('/api/users/session').send({
        email: 'kaio@gympass.test',
        password: '123456'
    })

    const {token} = response.body

    return {
        token
    }

}