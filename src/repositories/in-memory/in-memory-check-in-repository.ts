import { CheckIn, Prisma } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { ICheckInRepository } from "../check-in-repository-interface";
import dayjs from "dayjs";

export class InMemoryRespositoryCheckIn implements ICheckInRepository{
    public checkIns: CheckIn[] = []

    async save(checkIn: CheckIn){
        const indexCheckIn = this.checkIns.findIndex((itemCheckIn)=> itemCheckIn.id === checkIn.id)

        if(indexCheckIn >= 0){
            this.checkIns[indexCheckIn] = checkIn
        }
        return checkIn
    }
    
    async findById(id: string){
        const findCheckIn = this.checkIns.find((checkIn)=> checkIn.id === id) 
        
        if(!findCheckIn){
            return null
        }

        return findCheckIn
    }

    async countByUserId(idUser: string) {
        const listCheckIns = this.checkIns
       .filter((checkIn)=> checkIn.userId === idUser ).length

       return listCheckIns
    }

   async findManyGymByUserId(idUser: string, page: number) {
       const listCheckIns = this.checkIns
       .filter((checkIn)=> checkIn.userId === idUser )
       .slice((page - 1) *20, page * 20)

       return listCheckIns
    }

   async findByUserIdAndDate(idUsers: string, data: Date) {
        const startOfDay = dayjs(data).startOf('date')
        const endOfDay = dayjs(data).endOf('date')

        const checkIn = this.checkIns.find(checkIn => {
            const createdAtDayjs = dayjs(checkIn.createdAt)

            // verificar se a data do check-in do users encontrado está no mesmo dia
            const hasCheckInSameDay = createdAtDayjs.isAfter(startOfDay) && createdAtDayjs.isBefore(endOfDay)

           return checkIn.userId === idUsers && hasCheckInSameDay 
        })
        
        if (!checkIn){
            return null
        }

        return checkIn
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: faker.string.uuid(),
            userId: data.userId,
            gymId: data.gymId,
            validateAt: data.validateAt ? new Date(data.validateAt) : null,
            createdAt: new Date()
        }

        this.checkIns.push(checkIn);

        return checkIn
    }
   

}