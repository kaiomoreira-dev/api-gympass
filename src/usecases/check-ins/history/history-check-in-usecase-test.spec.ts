import {beforeEach, describe, expect,test} from 'vitest'
import { ListCheckInUseCase} from './history-check-in-usecase';
import { InMemoryRespositoryCheckIn } from '@/repositories/in-memory/in-memory-check-in-repository';
import { faker } from '@faker-js/faker';
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';

let inMemoryRespositoryCheckIn: InMemoryRespositoryCheckIn;
let inMemoryGymRepository: InMemoryGymRespository;
let stu: ListCheckInUseCase;

describe('List CheckIn Case', ()=>{
    beforeEach(()=>{
        inMemoryRespositoryCheckIn = new InMemoryRespositoryCheckIn()
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new ListCheckInUseCase(inMemoryRespositoryCheckIn)
    })

    test('should be able to list all check in for a user', async()=>{
        for(let i=1; i <= 22; i++){
            await inMemoryRespositoryCheckIn.create({
                gymId: `gym_id_${i}`,
                userId: 'user_test_05',
            })
        }

        const listCheckIns = await  stu.execute({
            idUser: 'user_test_05',
            page: 2
        });

        expect(listCheckIns.checkIns).toHaveLength(2)

        expect(listCheckIns.checkIns).toEqual([
            expect.objectContaining({gymId: 'gym_id_21',}),
            expect.objectContaining({gymId: 'gym_id_22',})
        ]);
      
    })
        
})