import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to create a gym', async()=>{
        // authenticar usuário
        const {token} = await createAndAuthenticateUser(fastifyApp, true)

        const createGymResponse = await request(fastifyApp.server)
        .post('/api/gyms')
        .send({
          description: 'No pain no gain',
          name: 'gym_test',
          phone: '77-77777-7777',
          latitude: 21.6206602,
          longitude: 49.7991475
      })
      .set('Authorization', `Bearer ${token}`)
      

      expect(createGymResponse.statusCode).toEqual(201)
    })
})