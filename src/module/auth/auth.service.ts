import {
   Injectable,
   UnauthorizedException
} from '@nestjs/common';

import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { MESSAGES } from '../../common/constants/messages.constants';
import { TokenService } from './token.service';
import { HashService } from 'src/common/services/hash.service';
import { ROLE } from 'src/common/constants/role.enum';

@Injectable()
export class AuthService {

   constructor(
      private readonly authRepository: AuthRepository,
      private readonly tokenService: TokenService,
      private readonly hashService: HashService
   ) { }

   async login(
      loginDto: LoginDto,
   ) {

      const user =
         await this.authRepository.findByEmail(
            loginDto.email
         );

      if (!user) {
         throw new UnauthorizedException(
            MESSAGES.AUTH.INVALID_CREDENTIALS
         );
      }

      const validPassword =
         await this.hashService.compare(
            loginDto.password,
            user.password
         );


      if (!validPassword) {
         throw new UnauthorizedException(
            MESSAGES.AUTH.INVALID_CREDENTIALS
         );
      }

      const accessToken =
         this.tokenService
            .createAccessToken(user);

      const refreshToken =
         this.tokenService
            .createRefreshToken(user);

      return {
         message: MESSAGES.AUTH.LOGIN_SUCCESS,
         user: {
            id: user._id,
            email: user.email,
            role: user.role
         },
         accessToken,
         refreshToken
      };
   }

}