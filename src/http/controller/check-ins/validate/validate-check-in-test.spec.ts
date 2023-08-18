import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Validate Check-in (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to validate a check-in for a gym', async()=>{
        // authenticar usuário
        const {token} = await createAndAuthenticateUser(fastifyApp, true)

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
          
          let checkIn = await prisma.checkIn.create({
            data:{
                gymId: gym.id,
                userId: user.id
            }
          })

        const validateCheckInResponse = await request(fastifyApp.server)
        .patch(`/api/check-ins/${checkIn.id}/validate`)
        .set('Authorization', `Bearer ${token}`)
        .send()
      

      expect(validateCheckInResponse.statusCode).toEqual(204)

      checkIn = await prisma.checkIn.findUniqueOrThrow({
        where:{ id: checkIn.id}
      })

      expect(checkIn.validateAt).toEqual(expect.any(Date))
    })
})