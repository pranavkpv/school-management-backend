import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
   ) { }
   createAccessToken(user: any) {
      return this.jwtService.sign(
         {
            sub: user._id,
            email: user.email,
            role: user.role,
         },
         {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
         },
      );
   }
   createRefreshToken(user: any) {
      return this.jwtService.sign(
         {
            sub: user._id,
         },
         {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
         },
      );
   }
   verifyAccessToken(token: string) {
      return this.jwtService.verify(token, {
         secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
   }
   verifyRefreshToken(token: string) {
      return this.jwtService.verify(token, {
         secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
   }
}