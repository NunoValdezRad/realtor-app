import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}


/*
  signup:
    1- Validate data we get from the user;
    2- validate that the email is not in use - unique
    3- hash the password
    4- store the user in the DB
 */


/* signIn */ 


/* me route */
