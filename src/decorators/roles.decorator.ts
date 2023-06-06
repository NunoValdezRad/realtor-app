import { UserType } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles); //accepts as parameters all the defined roles where the decorator is called, and sets the metadata (key:value pair) so that we can use this information in the "nests store" (metadata) that holds this information

/* 
   Reflector permite-nos utilizar a Metadata que temos nesta "store", 
*/
