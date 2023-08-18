import { InMemoryRespositoryUsers } from '@/repositories/in-memory/in-memory-users-repository'
import {beforeEach, describe, expect,test} from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-users-usecase'
import { hash } from 'bcrypt'
import {  InvalidUsersCredentialsError } from '../../errors/invalid-users-credentials'

let inMemoryUserRepository: InMemoryRespositoryUsers;
let stu: AuthenticateUserUseCase;

describe('Authenticate User Case', async()=>{
    beforeEach(async ()=>{
        inMemoryUserRepository = new InMemoryRespositoryUsers()
        stu = new AuthenticateUserUseCase(inMemoryUserRepository)

        await inMemoryUserRepository.create({
            name: 'user_test_01',
            email: "email@test.test",
            password_hash: await hash('123456', 6)
        })
    })

    test('should be able to authenticate a user', async()=>{
        const {user} = await stu.execute({
            email: "email@test.test",
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should not be able to authenticate with wrong password', async()=>{
        const {user} = await stu.execute({
            email: "email@test.test",
            password: '123456',
        })

         await expect(()=> stu.execute({
            email: user.email,
            password: '12345666',
        }),
        ).rejects.toBeInstanceOf(InvalidUsersCredentialsError)
    })

    test('should not be able to authenticate with wrong email', async()=>{
         await expect(()=> stu.execute({
            email: 'email@wrong.test',
            password: '12345666',
        }),
        ).rejects.toBeInstanceOf(InvalidUsersCredentialsError)
    })
})