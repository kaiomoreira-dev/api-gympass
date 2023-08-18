import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../gyms/search-gym/search-gym-usecase";
import { SearchNearbyGymUseCase } from "../gyms/search-nearby-gym/search-nearby-gym-usecase";

export async function makeSearchNearbyGym(): Promise<SearchNearbyGymUseCase>{
    const gymsRepository = new PrismaGymRepository();
    const searchNearbyGymUseCase = new SearchNearbyGymUseCase(gymsRepository)

    return searchNearbyGymUseCase;
}