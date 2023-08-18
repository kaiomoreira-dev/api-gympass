import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";

describe('Refresh Token (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to refresh token a user', async()=>{
        await request(fastifyApp.server).post('/api/users').send({
            name: 'Kaio Moreira',
            email: 'kaio@gympass.test',
            password: '123456'
        })

        const response = await request(fastifyApp.server).post('/api/users/session').send({
            email: 'kaio@gympass.test',
            password: '123456'
        })

        const cookie = response.get('Set-Cookie');

        const refreshToken = await request(fastifyApp.server)
        .patch('/api/users/token/refresh')
        .set('Cookie', cookie)
        .send()

        expect(refreshToken.statusCode).toEqual(200)
        expect(refreshToken.body).toEqual({
            token: expect.any(String)
        })
        expect(refreshToken.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})