import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { API_PREFIX } from './common/constants/routes.constants';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

export async function setupApp(
  app: INestApplication
) {

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(
    API_PREFIX
  );

  app.enableCors({
    origin: configService.get<string>('frontend.url'),
    credentials: true
  });

  app.use(
    cookieParser()
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
       forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

}