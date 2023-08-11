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
  async findManyGymByUserId(idUser: string, page: number){
    const gyms = await prisma.checkIn.findMany({
      where:{id: idUser},
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }

  async countByUserId(idUser: string){
    const countGyms = await prisma.checkIn.count({
      where: {id: idUser}
    })

    return countGyms
  }

  async save(checkIn: CheckIn){
    const gym = await prisma.checkIn.update({
      where:{id: checkIn.id},
      data: checkIn
    })

    return gym
  }
  async findByUserIdAndDate(idUsers: string, data: Date){
    const startOfDay = dayjs(data).startOf('date')
    const endOfDay = dayjs(data).endOf('date')
    
    const user = await prisma.checkIn.findFirst({
      where:{ id: idUsers, createdAt:{
        gte: startOfDay.toDate(),
        lte: endOfDay.toDate()
      }},
    })

    return user
  }
  
  async create(data: Prisma.CheckInUncheckedCreateInput){
    return prisma.checkIn.create({ data })
  }
}
