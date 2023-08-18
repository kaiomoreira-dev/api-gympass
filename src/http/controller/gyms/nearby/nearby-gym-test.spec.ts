import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Nearby Gyms (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to search nearby gyms', async()=>{
        // authenticar usuário
        const {token} = await createAndAuthenticateUser(fastifyApp, true)

        await request(fastifyApp.server)
        .post('/api/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Academia Fitipaldi',
            description: 'musculação e ginastica',
            phone: '77-77777-7777',
            latitude: -21.6256843,
            longitude: -49.8028895
      })

      await request(fastifyApp.server)
        .post('/api/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Academia Tao Tao Distante',
            description: 'musculação',
            phone: '77-77777-7777',
            latitude: -21.7431868,
            longitude: -49.675996
      })

      const searchNearbyGymsResponse = await request(fastifyApp.server)
      .get('/api/gyms/nearby')
      .query({
          latitude: -21.6334336,
          longitude: -49.7975296
        })
      .set('Authorization', `Bearer ${token}`)
      .send()

      expect(searchNearbyGymsResponse.statusCode).toEqual(200)
      expect(searchNearbyGymsResponse.body.gyms).toHaveLength(1)
      expect(searchNearbyGymsResponse.body.gyms).toEqual([
        expect.objectContaining({
            name: 'Academia Fitipaldi'
        })
      ])
    })
})