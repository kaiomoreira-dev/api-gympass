import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../gyms/create-gym/create-gym-usecase";


export async function makeCreateGym(): Promise<CreateGymUseCase>{
    const gymsRepository = new PrismaGymRepository();
    const createGymUseCase = new CreateGymUseCase(gymsRepository)

    return createGymUseCase;
}