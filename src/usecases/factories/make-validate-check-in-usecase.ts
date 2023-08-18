import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInUseCase } from "../check-ins/validate-checkin/validate-check-in-usecase";


export async function validateCheckIn(): Promise<ValidateCheckInUseCase>{
    const checkInRepository = new PrismaCheckInRepository()
    const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

    return validateCheckInUseCase;
}