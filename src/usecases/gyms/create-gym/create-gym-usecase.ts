import { Gym, User } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-in-repository-interface'

interface IRequestGym {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IResponseGym{
    gym: Gym,
}

export class CreateGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    name,
    description,    
    phone,
    latitude,
    longitude
}: IRequestGym): Promise<IResponseGym> {
   const gym = await this.gymRepository.create({
        name,
        description,    
        phone,
        latitude,
        longitude
   })

   return {
        gym
   };

  }
}
