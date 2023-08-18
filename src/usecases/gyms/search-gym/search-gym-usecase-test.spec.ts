import {beforeEach, describe, expect,test} from 'vitest'
import { SearchGymUseCase} from './search-gym-usecase';
import { InMemoryGymRespository } from '@/repositories/in-memory/in-memory-gym-repository';

let inMemoryGymRepository: InMemoryGymRespository;
let stu: SearchGymUseCase;

describe('List CheckIn Case', ()=>{
    beforeEach(()=>{
        inMemoryGymRepository = new InMemoryGymRespository()
         stu = new SearchGymUseCase(inMemoryGymRepository)
    })

    test('should be able to search a gym', async()=>{
        await inMemoryGymRepository.create({
            description: 'No pain no gain',
            name: 'gym_Dogs',
            phone: '77-77777-7777',
            latitude: 21.6206602,
            longitude: 49.7991475
        })

        await inMemoryGymRepository.create({
            description: 'No pain no gain',
            name: 'gym_Aves',
            phone: '77-77777-7777',
            latitude: 21.6206602,
            longitude: 49.7991475
        })

        const searchGym = await stu.execute({
            query: 'gym_Dogs',
            page: 1
        })

        expect(searchGym.gym).toEqual([
            expect.objectContaining({
                name: "gym_Dogs"
            })
        ])
    })

    test('should be able to paginate search gym', async()=>{
        for(let i=1; i <= 22; i++){
            await inMemoryGymRepository.create({
                id: `gym_id_${i}`,
                name: `gym_Aquarius_${i}`,
                phone: '77-77777-7777',
                latitude: 21.6206602,
                longitude: 49.7991475
            })
        }

        const {gym} = await  stu.execute({
            query: 'gym_Aquarius',
            page: 2
        });

        expect(gym).toHaveLength(2)

        expect(gym).toEqual([
            expect.objectContaining({name: 'gym_Aquarius_21',}),
            expect.objectContaining({name: 'gym_Aquarius_22',})
        ]);
      
    })
        
})