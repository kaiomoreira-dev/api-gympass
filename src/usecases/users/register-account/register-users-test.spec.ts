import { InMemoryRespositoryUsers } from '@/repositories/in-memory/in-memory-users-repository'
import {beforeEach, describe, expect,test} from 'vitest'
import { RegisterUserUseCase } from './register-users-usecase'
import { faker } from '@faker-js/faker'
import { UserAlreadyExistsError } from '@/usecases/errors/users-already-exists-error';

let inMemoryUserRepository: InMemoryRespositoryUsers;
let stu: RegisterUserUseCase;

describe('User Case', ()=>{
    beforeEach(()=>{
         inMemoryUserRepository = new InMemoryRespositoryUsers()
         stu = new RegisterUserUseCase(inMemoryUserRepository)
    })

    test('should be able to create a user', async()=>{
        const {user} = await stu.execute({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should not be able to create a user with email already exists', async()=>{
        const email = 'email@test.com'
        await stu.execute({
            name: faker.internet.userName(),
            email,
            password: '123456',
        })
         
         await expect(()=> stu.execute({
            name: faker.internet.userName(),
            email,
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})