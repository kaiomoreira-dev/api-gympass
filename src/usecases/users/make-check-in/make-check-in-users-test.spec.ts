import {afterEach, beforeEach, describe, expect,test, vi} from 'vitest'
import { faker } from '@faker-js/faker'
import { MakeCheckInUseCase } from './make-check-in-users-usecase';
import { InMemoryRespositoryCheckIn } from '@/repositories/in-memory/in-memory-check-in-repository';
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';
import { MaxOfNumberCheckInError } from '@/usecases/errors/max-of-number-check-in-error';
import { MaxDistanceExceededError } from '@/usecases/errors/max-distance-exceeded-error';

let inMemoryCheckInRepository: InMemoryRespositoryCheckIn;
let inMemoryGymRepository: InMemoryGymRespository;
let stu: MakeCheckInUseCase;

describe('Make Check-In Case', ()=>{
    beforeEach(async ()=>{
        inMemoryCheckInRepository = new InMemoryRespositoryCheckIn()
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new MakeCheckInUseCase(inMemoryGymRepository, inMemoryCheckInRepository)

         vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
      })

    test('should be able to make a check in', async()=>{
        vi.setSystemTime( new Date(2023, 1, 10, 8, 0, 0))

        const gym = await inMemoryGymRepository.create({
            name: 'gym_test',
            description: 'for hipetrofia',
            phone: faker.phone.number(),
            latitude: 21.6206602,
            longitude: 49.7991475
        })
        const createdCheckIn = await stu.execute({
            idGym: gym.id,
            idUser: faker.string.uuid(),
            userLatitude: 21.620866,
            userLongitude: 49.7993873
        })

        expect(createdCheckIn.checkIn.id).toEqual(expect.any(String))
    })

    test('should not be able to make check in same day', async()=>{
        vi.setSystemTime( new Date(2023, 1, 10, 8, 0, 0))

        const gym = await inMemoryGymRepository.create({
            name: 'gym_test',
            description: 'for hipetrofia',
            phone: faker.phone.number(),
            latitude: 21.6206602,
            longitude: 49.7991475
        })

       await stu.execute({
            idGym: gym.id,
            idUser: 'user_test_03',
            userLatitude: 21.6206602,
            userLongitude: 49.7991475
            
        })

        await expect(()=> stu.execute({
            idGym: gym.id,
            idUser: 'user_test_03',
            userLatitude: 21.6206602,
            userLongitude: 49.7991475
       }),
       ).rejects.toBeInstanceOf(MaxOfNumberCheckInError)
   })

    test('should be able to make check in different days', async()=>{
            vi.setSystemTime( new Date(2023, 1, 10, 8, 0, 0))

            const gym = await inMemoryGymRepository.create({
                name: 'gym_test',
                description: 'for hipetrofia',
                phone: faker.phone.number(),
                latitude: 21.6206602,
                longitude: 49.7991475
            })

            await stu.execute({
                idGym: gym.id,
                idUser: 'user_test_04',
                userLatitude: 21.6206602,
                userLongitude: 49.7991475
                
            })

            vi.setSystemTime( new Date(2023, 1, 11, 8, 0, 0))
            const createdCheckIn = await stu.execute({
                idGym: gym.id,
                idUser: 'user_test_04',
                userLatitude: 21.6206602,
                userLongitude: 49.7991475
                
            })

            expect(createdCheckIn.checkIn.id).toEqual(expect.any(String))
    })

    test('should not be able to make a check in outside the gym MAX distance range', async()=>{
        vi.setSystemTime( new Date(2023, 1, 13, 8, 0, 0))

        const gym = await inMemoryGymRepository.create({
            name: 'gym_test',
            description: 'for hipetrofia',
            phone: faker.phone.number(),
            latitude: 21.6206602,
            longitude: 49.7991475
        })

        await expect(()=> stu.execute({
            idGym: gym.id,
            idUser: faker.string.uuid(),
            userLatitude: 21.6077879,
            userLongitude:49.7975724
        })).rejects.toBeInstanceOf(MaxDistanceExceededError,)
    })

})