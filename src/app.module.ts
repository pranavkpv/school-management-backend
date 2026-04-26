import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import databaseConfig from './config/env.config';
import { AuthModule } from './module/auth/auth.module';
import { StudentModule } from './module/student/student.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { SubjectModule } from './module/subject/subject.module';
import { ClassModule } from './module/class/class.module';
import { ClassTeacherAssignmentModule } from './module/class-teacher-assignment/class-teacher-assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('database.uri');

        if (!uri) {
          throw new Error('❌ MONGO URI is not defined in .env');
        }

        return {
          uri,
        };
      },
    }),
    AuthModule,
    StudentModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    ClassTeacherAssignmentModule
  ],
})
export class AppModule {}