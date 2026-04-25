import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { User, UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';
import { HashService } from 'src/common/services/hash.service';
import { CookieService } from 'src/common/services/cookie.service';



@Module({
   imports: [
      ConfigModule,
      MongooseModule.forFeature([
         {
            name: User.name,
            schema: UserSchema
         }
      ]),

      JwtModule.register({
         secret: process.env.JWT_SECRET,
         signOptions: {
            expiresIn: '15m'
         }
      })
   ],

   controllers: [AuthController],
   providers: [
      AuthService,
      AuthRepository,
      TokenService,  
      HashService,
      CookieService
   ]
})

export class AuthModule { }