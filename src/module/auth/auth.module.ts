import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { User, UserSchema } from './user.schema';



@Module({
 imports:[
  MongooseModule.forFeature([
   {
    name:User.name,
    schema:UserSchema
   }
  ]),

  JwtModule.register({
   secret:process.env.JWT_SECRET,
   signOptions:{
    expiresIn:'15m'
   }
  })
 ],

 controllers:[AuthController],
 providers:[
  AuthService,
  AuthRepository
 ]
})

export class AuthModule{}