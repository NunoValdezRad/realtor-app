import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dto/auth.dto.ts/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

@Post('/signup/:userType')
signup(@Body() body: SignupDto){
    return this.authService.signup(body)
}

@Post('/signin')
    signin(@Body() body:SigninDto){
        return this.authService.signin(body)
    }


@Post("/key")
    generateProductKey(
        @Body() body: GenerateProductKeyDto
        ){
         return this.authService.generateProductKey(body.email, body.userType) //podia fazer o destructure do body, o @Body {email, userType}: GenerateProductKeyDto
}
}

