import { ListCheckInUseCase } from "../check-ins/history/history-check-in-usecase";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";


export async function makeHistoryCheckIn(): Promise<ListCheckInUseCase>{
    const checkInRepository = new PrismaCheckInRepository()
    const listCheckInUseCase = new ListCheckInUseCase(checkInRepository)

    return listCheckInUseCase;
}