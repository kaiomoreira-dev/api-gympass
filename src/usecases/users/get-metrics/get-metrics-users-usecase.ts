import { ICheckInRepository } from "@/repositories/check-in-repository-interface";

interface IRequestCheckIn{
    idUser: string
}

interface IResponseCheckIn{
    checkInCount: number
}

export class GetMetricsUseCase{
    constructor(
        private checkInRepository: ICheckInRepository
    ){}
  
    async execute({idUser}: IRequestCheckIn): Promise<IResponseCheckIn>{
        // conta check-ins existente por userid
        const countCheckIns = await this.checkInRepository.countByUserId(idUser)
        // retornar contagem de check-in
        return {
            checkInCount: countCheckIns
        }
    }
}