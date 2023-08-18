import { Prisma, CheckIn } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ICheckInRepository } from '../check-in-repository-interface'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements ICheckInRepository {
  async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where: {id}
    })

    return checkIn
  }
  async findManyByUserId(idUser: string, page: number){
    const checkIns = await prisma.checkIn.findMany({
      where:{userId: idUser},
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(idUser: string){
    const countCheckIn = await prisma.checkIn.count({
      where: {userId: idUser}
    })

    return countCheckIn
  }

  async save(checkIn: CheckIn){
    const updatedCheckIn = await prisma.checkIn.update({
      where:{id: checkIn.id},
      data: checkIn
    })

    return updatedCheckIn
  }
  async findByUserIdAndDate(idUsers: string, data: Date){
    const startOfDay = dayjs(data).startOf('date')
    const endOfDay = dayjs(data).endOf('date')
    
    const checkIn = await prisma.checkIn.findFirst({
      where:{ id: idUsers, createdAt:{
        gte: startOfDay.toDate(),
        lte: endOfDay.toDate()
      }},
    })

    return checkIn
  }
  
  async create(data: Prisma.CheckInUncheckedCreateInput){
    return prisma.checkIn.create({ data })
  }
}
