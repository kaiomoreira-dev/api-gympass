import { IUsersRepository } from "@/repositories/users-repository-interface";
import { InvalidUsersCredentialsError } from "@/usecases/errors/invalid-users-credentials";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

interface IRequestAuthenticateUsers{
    email: string;
    password: string;
}

interface IResponseAuthenticateUsers{
    user: User
}

export class AuthenticateUserUseCase{
    constructor(private userRepository: IUsersRepository){}
  
    async execute({email, password}: IRequestAuthenticateUsers): Promise<IResponseAuthenticateUsers>{
        // buscar user pelo email
        const findUserExist = await this.userRepository.findByEmail(email)
        // verificar se user buscado pelo existe
        if(!findUserExist){
            // se user buscado pelo email nao existir disparar error
            throw new InvalidUsersCredentialsError()
        }
        // comparar senha recebida no parato com senha hash de user no banco
        const isPasswordHashMatch = await compare(password, findUserExist.password_hash)
        if(!isPasswordHashMatch){
            // se password for incorreto disparar error
            throw new InvalidUsersCredentialsError()
        }
        // retornar usuário
        return {
            user: findUserExist
        }
    }
}