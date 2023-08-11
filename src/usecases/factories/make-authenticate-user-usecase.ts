import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUserUseCase } from "../users/sign-in/authenticate-users-usecase";


export async function makeAuthenticateUser(): Promise<AuthenticateUserUseCase>{
    const usersRepository = new PrismaUsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    return authenticateUserUseCase;
}