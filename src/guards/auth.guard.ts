import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

interface JWTPayload {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // 1- determine the UserTypes that can run a given endpoint => Comming from CONTEXT! (is comming in the request, and that means we can grat it in the context)
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles);

    // 2- grab JWT from the request header and verify it, if there's any roles inside the roles array => decode the payload and verify if the JWT has the secret we have in our .env file
    if (roles?.length) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const payload = (await jwt.verify(
          token,
          process.env.JSON_TOKEN_KEY,
        )) as JWTPayload;
        console.log({
          payload,
          message:
            'This is the payload/user we are grabbing in the auth guard ',
        });

        const user = await this.prismaService.user.findUnique({
          where: {
            id: payload.id, //because this payload we are getting is the users info
          },
        });
        // console.log({ user_inside_auth_guard: user });
        if (!user) return false;
        if (roles.includes(user.user_type)) return true;
        return false;
      } catch (error) {
        return false;
      }
    }

    return true;
    /*
3- DB request do get user by id
4- determine if the user has permission 
(Reflector allows us to use the Metadata we have in this "store" )
*/

    // return false;
  }
}
