import { UserType } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles); //aceita como parametros tds os roles definidos onde o decorator for chamado, e faz o set da metadata (key:value pair) para q possamos usar essa informação nessa "store do nest" q guarda esta informação

/* 
   Reflector permite-nos utilizar a Metadata que temos nesta "store", 
*/
