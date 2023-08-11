import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { GetUserProfileUseCase } from "../users/get-profile/get-profile-users-usecase";


export async function makeGetProfileUser(): Promise<GetUserProfileUseCase>{
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    return getUserProfileUseCase;
}