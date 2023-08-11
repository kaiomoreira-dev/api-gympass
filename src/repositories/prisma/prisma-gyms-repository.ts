import { Prisma, Gym } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { IGymsRepository, IParamCoordinates } from '../gyms-in-repository-interface'

export class PrismaGymRepository implements IGymsRepository {
  async searchMany(query: string, page: number){
    const gyms = await prisma.gym.findMany({
      where: {
        name:{
        contains: query,
      }
    },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }

  async searchManyNearby({latitude, longitude}: IParamCoordinates){
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
  
  async findById(idGyms: string): Promise<Gym | null> {
    return prisma.gym.findUnique({ where: { id:idGyms } })
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({ data })
  }
}
