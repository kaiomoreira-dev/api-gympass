import {afterEach, beforeEach, describe, expect,test, vi} from 'vitest'
import { InMemoryRespositoryCheckIn } from '@/repositories/in-memory/in-memory-check-in-repository';
import { ValidateCheckInUseCase } from './validate-check-in-usecase';
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error';
import { LateTimeCheckInError } from '@/usecases/errors/late-time-check-in-error';

let inMemoryCheckInRepository: InMemoryRespositoryCheckIn;
let stu: ValidateCheckInUseCase;

describe('Validate Check-In Case', ()=>{
    beforeEach(async ()=>{
        inMemoryCheckInRepository = new InMemoryRespositoryCheckIn()
         stu = new ValidateCheckInUseCase(inMemoryCheckInRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
      })

    test('should be able to validate a check-in', async()=>{
        const createdCheckIn = await inMemoryCheckInRepository.create({
            gymId: 'gym_01',
            userId: 'user_07',
        })

        const {checkIn} = await stu.execute({
            idCheckIn: createdCheckIn.id
        })

        expect(checkIn.validateAt).toEqual(expect.any(Date))
    })

    test('should not be able to validate with check-in not exists', async()=>{
        await expect(()=> stu.execute({
            idCheckIn: 'checkIn-not-exists'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    test('should not be able to validated up check-in to 20 minutes after being created', async()=>{
        vi.setSystemTime(new Date(2023, 1, 10, 8, 40))//data/hora do sistema do vitest
        // criar check-in
        const checkIn = await inMemoryCheckInRepository.create({
            gymId: 'gym_02',
            userId: 'user_08',
        })

        // avançar no tempo 21 minutos para causar error
        // de tempo excedido
        vi.advanceTimersByTime(1000 * 60 * 21)// 21minutos apos a data do vitest

        await expect(()=> stu.execute({
            idCheckIn: checkIn.id
        })).rejects.toBeInstanceOf(LateTimeCheckInError)
    })


})