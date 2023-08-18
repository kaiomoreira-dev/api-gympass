import {beforeEach, describe, expect,test} from 'vitest'
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';
import { SearchNearbyGymUseCase } from './search-nearby-gym-usecase';

let inMemoryGymRepository: InMemoryGymRespository;
let stu: SearchNearbyGymUseCase;

describe('Gym Case', ()=>{
    beforeEach(()=>{
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new SearchNearbyGymUseCase(inMemoryGymRepository)
    })

    test('should be able to search nearby gym', async()=>{
       await inMemoryGymRepository.create({
        name: 'Academia Fitipaldi',
        description: 'musculação e ginastica',
        phone: '77-77777-7777',
        latitude: 21.6256843,
        longitude: 49.8028895
       })

       await inMemoryGymRepository.create({
        name: 'Academia Tao Tao Distante',
        description: 'musculação',
        phone: '77-77777-7777',
        latitude: 21.6953298,
        longitude: 49.7329089
       })

       const nearbyGym = await stu.execute({
        userLatitude: 21.623552,
        userLongitude: 49.797934
       })

       expect(nearbyGym.gyms).toEqual([
            expect.objectContaining({name: 'Academia Fitipaldi'}),
       ])

    })

})