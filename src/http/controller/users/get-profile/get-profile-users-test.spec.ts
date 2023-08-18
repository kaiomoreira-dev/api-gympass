import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { fastifyApp } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Get profile User (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to get profile a user', async()=>{
        const {token} = await createAndAuthenticateUser(fastifyApp)

        const responseProfile = await request(fastifyApp.server)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send()


        expect(responseProfile.statusCode).toEqual(200)
        expect(responseProfile.body.user).toEqual(expect.objectContaining({
            email: 'kaio@gympass.test'
        }))
    })
})