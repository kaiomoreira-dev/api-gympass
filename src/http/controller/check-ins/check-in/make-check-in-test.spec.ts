import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Make Check-in (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to user make a check-in for a gym', async()=>{
        // authenticar usuário
        const {token} = await createAndAuthenticateUser(fastifyApp)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
          data:{
            description: 'No pain no gain',
            name: 'Gym Pain',
            phone: '77-77777-7777',
            latitude: -21.620576,
            longitude: -49.7990308
          }
        })
        
        const createCheckInResponse = await request(fastifyApp.server)
        .post(`/api/check-ins`)
        .send({
          gymId: gym.id,
          userId: user.id,
          latitude: -21.621224,
          longitude: -49.798982
      })
      .set('Authorization', `Bearer ${token}`)
      

      expect(createCheckInResponse.statusCode).toEqual(204)
    })
})