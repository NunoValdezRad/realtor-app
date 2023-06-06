import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto.ts/auth.dto';
import { UserType } from '@prisma/client';
import { UserInfo } from '../decorators/user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto, userType: UserType): Promise<string>;
    signin(body: SigninDto): Promise<string>;
    generateProductKey({ email, userType }: GenerateProductKeyDto): Promise<string>;
    me(user: UserInfo): UserInfo;
}
