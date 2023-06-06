import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    //NOTA: this code here is going to intercept the Request!

    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1]; //returns an array, because of the split, and we remove the 2nd parameter of the array, which is the token itself
    const user = await jwt.decode(token);

    request.user = user; //so we create the user property, inside the request made by the client... so, in the user.decorator we will have access to the request made, and it will contain this user property that we added, with the already 'decoded' user information, the result of intercepting the http request made by the client
    return next.handle();

    // return handler.handle(/*  handle intercepts the response */);
  }
}
