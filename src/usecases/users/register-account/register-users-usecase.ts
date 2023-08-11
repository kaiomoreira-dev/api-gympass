import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from '../../errors/users-already-exists-error'
import { IUsersRepository } from '@/repositories/users-repository-interface'

interface IRegisterUserRequest {
  name: string
  email: string
  password: string
}

interface IRegisterUserResponse{
    user: User,
}

export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUserRequest): Promise<IRegisterUserResponse> {
    // buscar user por email
    const findUserExist = await this.usersRepository.findByEmail(email)
    
    // validar email do user se ja existe
    if (findUserExist) {
      throw new UserAlreadyExistsError()
    }

    // criptografar password
    const passwordCrypting = await hash(password, 6)

    // criar usuario
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordCrypting,
    })

    // retornar usuario
    return {
        user
    }
  }
}
