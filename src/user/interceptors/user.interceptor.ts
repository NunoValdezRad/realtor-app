import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    //NOTA:   qualquer código que punhamos aqui vai interceptar o Request!

    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1]; //retorna um array, por causa do split, e retiramos o 2º parametro do array, q é o token em si
    const user = await jwt.decode(token);

    request.user = user; //assim criamos a propriedade user, dentro do request feito pelo client... assim, no user.decorator vamos ter acesso ao request feito, e em si vai conter esta propriedade user q adicionámos, com a informação já 'decoded' (descodificada) do user, resultado da intercepção do pedido http feito pelo cliente
    return next.handle();

    // return handler.handle(/* este handle intercepta a resposta*/);
  }
}
