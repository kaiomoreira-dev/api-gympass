import { IGymsRepository } from '@/repositories/gyms-in-repository-interface'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { Gym } from '@prisma/client'

interface IRequestSearchGym {
  query: string
  page: number
}

interface IResponseSearchGym{
    gym: Gym[],
}

export class SerachGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    query,
    page
}: IRequestSearchGym): Promise<IResponseSearchGym> {
    const gym = await this.gymRepository.searchMany(query, page)

    if(!gym){
        throw new ResourceNotFoundError
    }
    
    return {
        gym: gym
    }
  
  }
}
