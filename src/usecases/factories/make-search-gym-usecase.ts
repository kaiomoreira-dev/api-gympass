import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../gyms/search-gym/search-gym-usecase";

export async function makeSearchGym(): Promise<SearchGymUseCase>{
    const gymsRepository = new PrismaGymRepository();
    const searchGymUseCase = new SearchGymUseCase(gymsRepository)

    return searchGymUseCase;
}