import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dto/auth.dto.ts/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto): Promise<string>;
    signin(body: SigninDto): Promise<string>;
    generateProductKey(body: GenerateProductKeyDto): Promise<string>;
}
