import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dto/auth.dto.ts/auth.dto';
import { UserType } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto, userType: UserType): Promise<string>;
    signin(body: SigninDto): Promise<string>;
    generateProductKey({ email, userType }: GenerateProductKeyDto): Promise<string>;
}
