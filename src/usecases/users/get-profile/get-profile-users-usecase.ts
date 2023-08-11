import { IUsersRepository } from "@/repositories/users-repository-interface";
import { ResourceNotFoundError } from "@/usecases/errors/resource-not-found-error";
import { User } from "@prisma/client";

interface IRequestGetUsers{
    idUsers: string
}

interface IResponseGetUsers{
    user: User
}

export class GetUserProfileUseCase{
    constructor(private userRepository: IUsersRepository){}
  
    async execute({idUsers}: IRequestGetUsers): Promise<IResponseGetUsers>{
        // buscar user pelo email
        const findUserExist = await this.userRepository.findById(idUsers)
        // verificar se user buscado pelo existe
        if(!findUserExist){
            // se user buscado pelo email nao existir disparar error
            throw new ResourceNotFoundError
        }
        return {
            user: findUserExist
        }
    }
}