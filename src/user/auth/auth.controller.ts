import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseEnumPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import {
  GenerateProductKeyDto,
  SigninDto,
  SignupDto,
} from '../dto/auth.dto.ts/auth.dto';
import { UserType } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType, //o ParseEnumPipe faz a validação do USER P VER SE É DO TIPO USERTYPE
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );
      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }

    return this.authService.signup(body, userType);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() { email, userType }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(email, userType); //podia user directamente o body, ficaria assim: @Body body: GenerateProductKeyDto
  }
}
