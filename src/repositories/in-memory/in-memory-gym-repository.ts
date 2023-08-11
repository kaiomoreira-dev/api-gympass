import {  Gym, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { IGymsRepository, IParamCoordinates } from "../gyms-in-repository-interface";
import { GetResult } from "@prisma/client/runtime/library";
import { getBetweenDistanceCalculate } from "@/utils/get-between-distance-calculate";

export class InMemoryGymRespository implements IGymsRepository{
    public gyms: Gym[] = []
    
    async searchManyNearby(userParam: IParamCoordinates) {
        const gyms = this.gyms.filter((gym)=>{
            const distance = getBetweenDistanceCalculate(
                {latitude:userParam.latitude, longitude: userParam.longitude},
                {latitude: Number(gym.latitude), longitude:Number(gym.longitude)})

            return distance < 10
        })
        return gyms;
    }
    async searchMany(query: string, page: number) {
        const gym = this.gyms.filter((gym)=> gym.name
        .includes(query))
        .slice((page - 1) * 20, page * 20 )

        if(!gym){
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: faker.string.uuid(),
            name: data.name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.gyms.push(gym)

        return gym
    }
    
    async findById(idGyms: string) {
        const gym = this.gyms.find(gym=> gym.id === idGyms)

        if (!gym){
            return null
        }

        return gym
    }
}