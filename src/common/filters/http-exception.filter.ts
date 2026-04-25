import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { MESSAGES } from '../constants/messages.constants';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter {

  catch(
    exception: unknown,
    host: ArgumentsHost
  ) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : MESSAGES.GENERAL.SERVER_ERROR;

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date()
    });

  }

}