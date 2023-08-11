import { Prisma, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { IUsersRepository } from "../users-repository-interface";
import {faker} from '@faker-js/faker'
import { randomUUID } from "crypto";

export class InMemoryRespositoryUsers implements IUsersRepository{
    public users: User[] = []
    
    async findById(idUsers: string): Promise<User | null> {
        const user = this.users.find(user=> user.id === idUsers)

        if (!user){
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            name:data.name,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: new Date(), 
         }

         this.users.push(user)

        return user;
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user=> user.email === email)

        if (!user){
            return null
        }

        return user
    }
}