import { IGymsRepository } from '@/repositories/gyms-in-repository-interface';
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error';
import { Gym } from '@prisma/client'

interface IRequestSearchNearbyGym {
  userLatitude: number;
  userLongitude: number;
}

interface IResponseSearchNearbyGym{
    gyms: Gym[],
}

export class SearchNearbyGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude
}: IRequestSearchNearbyGym): Promise<IResponseSearchNearbyGym> {
    // buscar academias perto com base na distancia do user
    // e da academia.

    const gyms = await this.gymRepository.searchManyNearby({
        latitude: userLatitude,
        longitude: userLongitude
    });

    //verificar se existe alguma academia
    if(!gyms){
        throw new ResourceNotFoundError()
    }
    
    //retornar academias perto
    return {
        gyms
    }
  
  }
}
