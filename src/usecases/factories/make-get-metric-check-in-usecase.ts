import { GetMetricsUseCase } from "../check-ins/get-metrics/get-metrics-users-usecase";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";


export async function makeGetMetricsCheckIns(): Promise<GetMetricsUseCase>{
    const checkInRepository = new PrismaCheckInRepository()
    const getMetricsUseCase = new GetMetricsUseCase(checkInRepository)

    return getMetricsUseCase;
}