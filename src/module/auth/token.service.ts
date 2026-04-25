import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

   constructor(
      private readonly jwtService: JwtService
   ) { }

   createAccessToken(user: any) {

      return this.jwtService.sign(
         {
            sub: user._id,
            email: user.email,
            role: user.role
         },
         {
            expiresIn: '15m'
         }
      );

   }

   createRefreshToken(user: any) {

      return this.jwtService.sign(
         {
            sub: user._id
         },
         {
            expiresIn: '7d'
         }
      );

   }

}