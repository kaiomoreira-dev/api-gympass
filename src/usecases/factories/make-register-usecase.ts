import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { RegisterUserUseCase } from "../users/register-account/register-users-usecase";


export async function makeRegisteUser(): Promise<RegisterUserUseCase>{
    const usersRepository = new PrismaUsersRepository();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    return registerUserUseCase;
}