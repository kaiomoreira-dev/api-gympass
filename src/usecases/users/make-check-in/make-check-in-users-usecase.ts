import { ICheckInRepository } from "@/repositories/check-in-repository-interface";
import { IGymsRepository } from "@/repositories/gyms-in-repository-interface";
import { MaxDistanceExceededError } from "@/usecases/errors/max-distance-exceeded-error";
import { MaxOfNumberCheckInError } from "@/usecases/errors/max-of-number-check-in-error";
import { ResourceNotFoundError } from "@/usecases/errors/resource-not-found-error";
import { getBetweenDistanceCalculate } from "@/utils/get-between-distance-calculate";
import { CheckIn, User } from "@prisma/client";

interface IRequestCheckIn{
    idUser: string
    idGym: string
    userLongitude: number
    userLatitude: number
}

interface IResponseCheckIn{
    checkIn: CheckIn
}

export class MakeCheckInUseCase{
    constructor(
        private gymRepository: IGymsRepository,
        private checkInRepository: ICheckInRepository
    ){}
  
    async execute({idUser, idGym, userLatitude, userLongitude}: IRequestCheckIn): Promise<IResponseCheckIn>{
        // buscar user pelo id
        // const findUserExists = await this.userRepository.findById(idUser)

        // // verificar se user buscado pelo id existe
        // if(!findUserExists){
        //     // se user buscado pelo id se nao existir disparar error
        //     throw new ResourceNotFoundError()
        // }
        // // buscar gym pelo id
        const findGymExists = await this.gymRepository.findById(idGym)

        // verificar se gym buscada existe
        if(!findGymExists){
            // se user buscado pelo email nao existir disparar error
            throw new ResourceNotFoundError()
        }
        // buscar checkin existente pela data e user
        const getCheckInExistSameDay = await this.checkInRepository.findByUserIdAndDate(idUser, new Date )

        // verificar se eixste check in na mesma data
        if(getCheckInExistSameDay){
            throw new MaxOfNumberCheckInError()
        }

        const distance = getBetweenDistanceCalculate({latitude:userLatitude, longitude:userLongitude}, {latitude: Number(findGymExists.latitude), longitude: Number(findGymExists.longitude)})

        const MAX_DISTANCE_KILOMETERS = 0.1;

        if(distance > MAX_DISTANCE_KILOMETERS){
            throw new MaxDistanceExceededError
        }

        // criar check-in
         const checkIn = await this.checkInRepository.create({
            userId: idUser,
            gymId: idGym,
         })

        // retornar check-in
        return {
            checkIn
        }
    }
}