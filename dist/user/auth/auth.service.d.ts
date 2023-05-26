import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '@prisma/client';
interface SignupParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}
interface SigninParams {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private generateJWT;
    signup({ email, password, name, phone }: SignupParams, userType: UserType): Promise<string>;
    signin({ email, password }: SigninParams): Promise<string>;
    generateProductKey(email: string, userType: UserType): Promise<string>;
}
export {};
