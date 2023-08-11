import { InMemoryRespositoryUsers } from '@/repositories/in-memory/in-memory-users-repository'
import {beforeEach, describe, expect,test} from 'vitest'
import { faker } from '@faker-js/faker'
import { GetUserProfileUseCase } from './get-profile-users-usecase';
import { hash } from 'bcrypt';
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error';

let inMemoryUserRepository: InMemoryRespositoryUsers;
let stu: GetUserProfileUseCase;

describe('Get Profile Case', ()=>{
    beforeEach(async ()=>{
         inMemoryUserRepository = new InMemoryRespositoryUsers()
         stu = new GetUserProfileUseCase(inMemoryUserRepository)

    })

    test('should be able to get a  pofile user', async()=>{
       const createUser = await inMemoryUserRepository.create({
        id: faker.string.uuid(),
        name: 'user_test',
        email: 'user@getprofile.test',
        password_hash: await hash('123456', 6)
       })

        const {user} = await stu.execute({
            idUsers: createUser.id
            
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should not be able to get a user with wrong id', async()=>{
         await expect(()=> stu.execute({
           idUsers: 'not-found-less-id'
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})