import { CheckIn, Gym, User } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-in-repository-interface'
import { ICheckInRepository } from '@/repositories/check-in-repository-interface'

interface IRequestGym {
  idUser: string
  page: number
}

interface IResponseGym{
    checkIns: CheckIn[],
}

export class ListCheckInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    idUser,
    page
}: IRequestGym): Promise<IResponseGym> {

    const listCheckIns = await this.checkInRepository.findManyByUserId(idUser, page)

    return {
        checkIns: listCheckIns
    }
  
  }
}
