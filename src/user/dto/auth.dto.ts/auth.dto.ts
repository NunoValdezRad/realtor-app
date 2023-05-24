import { UserType } from '@prisma/client';
import {IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum} from 'class-validator'

export class SignupDto{
   
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Matches(/^(?:(?:\+|00)351)?\s*9[1236]\d{7}$/, {message: "Phone must be a Portuguese valid phone number"})
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}

export class SigninDto{
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class GenerateProductKeyDto{
    @IsEmail()
    email: string;

    @IsEnum(UserType)
    userType: UserType
}