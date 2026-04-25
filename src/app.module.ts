import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import databaseConfig from './config/database.config';

@Module({
 imports: [
   ConfigModule.forRoot({
     isGlobal: true,
     load: [databaseConfig],
   }),

   MongooseModule.forRootAsync({
     inject: [ConfigService],
     useFactory: (config: ConfigService) => ({
       uri: config.get<string>('database.uri'),
     }),
   }),
 ],
})
export class AppModule {}