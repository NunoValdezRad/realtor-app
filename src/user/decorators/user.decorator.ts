import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface UserInfo {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  // este método aceita dois parametros: a data propriamente dita, e o context, que vem do interceptor que criámos!

  const request = context.switchToHttp().getRequest(); //agarramos no request, e retornamos a propriedade user q lhe adicionámos

  return request.user;
});
