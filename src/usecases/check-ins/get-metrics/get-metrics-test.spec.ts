import {afterEach, beforeEach, describe, expect,test, vi} from 'vitest'
import { GetMetricsUseCase } from './get-metrics-users-usecase';
import { InMemoryRespositoryCheckIn } from '@/repositories/in-memory/in-memory-check-in-repository';
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';

let inMemoryCheckInRepository: InMemoryRespositoryCheckIn;
let inMemoryGymRepository: InMemoryGymRespository;
let stu: GetMetricsUseCase;

describe('Get Metrics User Case', ()=>{
    beforeEach(async ()=>{
        inMemoryCheckInRepository = new InMemoryRespositoryCheckIn()
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new GetMetricsUseCase(inMemoryCheckInRepository)

         vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
      })

    test('should be able to get metrics users', async()=>{
        await inMemoryCheckInRepository.create({
            gymId: "gym_id_01",
            userId: "user_id_06",
        })

        await inMemoryCheckInRepository.create({
            gymId: "gym_id_01",
            userId: "user_id_06",
        })

        const {checkInCount} = await stu.execute({
            idUser: "user_id_06"
        })

        expect(checkInCount).toEqual(2)
    })

})