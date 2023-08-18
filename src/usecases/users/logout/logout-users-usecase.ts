
interface IRequestLogoutUsers{
    refreshToken: string;
}

export class LogoutUserUseCase{
    constructor(){}
  
    async execute({refreshToken}: IRequestLogoutUsers): Promise<void>{
        
    }
}