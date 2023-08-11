import { Gym, Prisma,  } from '@prisma/client'

export interface IParamCoordinates{
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(idGyms: string): Promise<Gym | null>
  searchMany(query: string, page:number): Promise<Gym[] | null>
  searchManyNearby(userParam: IParamCoordinates): Promise<Gym[]>
}
