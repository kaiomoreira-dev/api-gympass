import {beforeEach, describe, expect,test} from 'vitest'
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from './create-gym-usecase';

let inMemoryGymRepository: InMemoryGymRespository;
let stu: CreateGymUseCase;

describe('Gym Case', ()=>{
    beforeEach(()=>{
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new CreateGymUseCase(inMemoryGymRepository)
    })

    test('should be able to create a gym', async()=>{
        const {gym} = await stu.execute({
            description: 'No pain no gain',
            name: 'gym_test',
            phone: '77-77777-7777',
            latitude: 21.6206602,
            longitude: 49.7991475
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})