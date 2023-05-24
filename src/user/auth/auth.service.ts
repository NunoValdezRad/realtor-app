import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {UserType} from '@prisma/client'

interface SignupParams{
    email: string;
    password: string;
    name:string;
    phone: string
}
interface SigninParams{
    email: string;
    password: string;
   
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}


  async signup({email, password, name, phone}: SignupParams){
            const userExists = await this.prismaService.user.findUnique({
            where: {
                    email
                }
            })
            if(userExists){
                throw new ConflictException()
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.prismaService.user.create({
                data:{
                    email, 
                    name,
                    phone,
                    password: hashedPassword,
                    user_type: UserType.BUYER
                }
            }) 
            console.log(user)

            return this.generateJWT(user.name, user.id)
    }


    async signin({email, password}: SigninParams){
        const existingUser = await this.prismaService.user.findUnique({
            where:{ email}
        })
        console.log(existingUser)
        if(!existingUser){
            throw new HttpException('Invalid credentials', 400)
        }
        const hashedPassword = existingUser.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword); //isto retorna um boolean

        if(!isValidPassword){ throw new HttpException('Invalid credentials', 400)}

        const token = await this.generateJWT(existingUser.name, existingUser.id)
        return token;

    }

         private async generateJWT(name: string, id: number){
        return jwt.sign({name, id} , process.env.JSON_TOKEN_KEY , {expiresIn: 36000000 } )
  
    }

    // getAllUsers(){
    //     return this.prismaService.user.findMany()
    // }
    
    generateProductKey(email:string, userType: UserType){
        const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

        return bcrypt.hash(string, 10)
    }

}
