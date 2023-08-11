import { Prisma, CheckIn } from '@prisma/client'

export interface ICheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdAndDate(idUsers: string, data: Date): Promise<CheckIn | null>
  findManyGymByUserId(idUser: string, page:number): Promise<CheckIn[]>
  countByUserId(idUser: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
