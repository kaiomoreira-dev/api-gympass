import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { MakeCheckInUseCase } from "../check-ins/make-check-in/make-check-in-usecase";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";


export async function makeCheckIn(): Promise<MakeCheckInUseCase>{
    const gymRepository = new PrismaGymRepository()
    const checkInRepository = new PrismaCheckInRepository()
    const makeCheckInUseCase = new MakeCheckInUseCase(gymRepository, checkInRepository)

    return makeCheckInUseCase;
}