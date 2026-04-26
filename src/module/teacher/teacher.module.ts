import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './teacher.schema';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository, RolesGuard],
})
export class TeacherModule {}
