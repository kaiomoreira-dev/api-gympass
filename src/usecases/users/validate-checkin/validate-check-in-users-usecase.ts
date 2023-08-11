import { ICheckInRepository } from "@/repositories/check-in-repository-interface";
import { LateTimeCheckInError } from "@/usecases/errors/late-time-check-in-error";
import { ResourceNotFoundError } from "@/usecases/errors/resource-not-found-error";
import { CheckIn, User } from "@prisma/client";
import dayjs from "dayjs";

interface IRequestValidateCheckIn{
    idCheckIn: string
}

interface IResponseValidateCheckIn{
    checkIn: CheckIn
}

export class ValidateCheckInUseCase{
    constructor(
        private checkInRepository: ICheckInRepository
    ){}
  
    async execute({idCheckIn}: IRequestValidateCheckIn): Promise<IResponseValidateCheckIn>{
        // buscar check-in pelo id
        const findCheckInExists = await this.checkInRepository.findById(idCheckIn)

        // verificar se check in buscado pelo id existe
        if(!findCheckInExists){
            // se checkin buscado pelo id nao existir disparar error
            throw new ResourceNotFoundError()
        }

        // comparar data atual com data de criação do checkin
        const waitingTimeForCheckIn = dayjs(new Date()).diff(findCheckInExists.createdAt,'minutes')
        
        // verificar se o tempo da data/hora é maior que 20 minutos
        if(waitingTimeForCheckIn > 20){
            // se for a data/hora for disparar error de tempo excedido
            throw new LateTimeCheckInError()
        }

        // atualizar check-in buscado com data atual
        findCheckInExists.validateAt = new Date()

        // salvar atualização feita no check-in    
        await this.checkInRepository.save(findCheckInExists)

        // retornar check-in
        return {
            checkIn:findCheckInExists
        }
    }
}