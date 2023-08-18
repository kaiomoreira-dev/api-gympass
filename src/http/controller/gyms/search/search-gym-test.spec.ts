import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Gyms (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to search gyms', async()=>{
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
            name: 'Academia Duboi',
            description: 'musculação e ginastica',
            phone: '77-77777-7777',
            latitude: -21.6953298,
            longitude: -49.7329089
      })

      const searchGymsResponse = await request(fastifyApp.server)
      .get('/api/gyms/search')
      .query({
          query: 'Duboi',
          page: 1
        })
      .set('Authorization', `Bearer ${token}`)
      .send()

      expect(searchGymsResponse.statusCode).toEqual(200)
      expect(searchGymsResponse.body.gym).toHaveLength(1)
      expect(searchGymsResponse.body.gym).toEqual([
        expect.objectContaining({
          name: 'Academia Duboi',
      })
      ])
    })
})