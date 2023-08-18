import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('History Check-ins (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to get check-ins metrics to a user', async()=>{
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
          
         await prisma.checkIn.createMany({
            data:
            [
                {
                    gymId: gym.id,
                    userId: user.id,
                },
                {
                    gymId: gym.id,
                    userId: user.id
                }
            ]
          })
       
        const countCheckInResponse = await request(fastifyApp.server)
        .get(`/api/check-ins/${user.id}/metrics`)
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(countCheckInResponse.statusCode).toBe(200)
        expect(countCheckInResponse.body.checkInCount).toBe(2)
      
    })
})