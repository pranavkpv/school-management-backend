import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupApp } from './app.setup';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

   await setupApp(app);

  const configService = app.get(ConfigService);

  const port =
    configService.get<number>('port.num') || 5000;

  await app.listen(port);
  console.log(`Server running on ${ port }`);

}

bootstrap();