import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from '../../common/services/cookie.service';
import { ROUTES } from '../../common/constants/routes.constants';
import { HttpStatusCode } from '../../common/constants/http-status.enum';
import { LoginDto } from './dto/login.dto';

@Controller(ROUTES.AUTH)
export class AuthController {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) { }

  @Post(ROUTES.LOGIN)
  @HttpCode(HttpStatusCode.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {

    const result = await this.authService.login(loginDto);

    // set cookies
    this.cookieService.setAuthCookies(
      res,
      result.accessToken,
      result.refreshToken,
    );
    console.log(result.accessToken)

    return {
      statusCode: HttpStatusCode.OK,
      message: result.message
    };
  }
}