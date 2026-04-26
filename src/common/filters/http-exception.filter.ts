import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { MESSAGES } from '../constants/messages.constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = MESSAGES.GENERAL.SERVER_ERROR;

    console.log('RAW ERROR:', exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();

      // handle both string and object errors
      message =
        typeof res === 'string'
          ? res
          : (res as any).message || res;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}