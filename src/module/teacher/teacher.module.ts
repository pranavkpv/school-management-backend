import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './teacher.schema';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthRepository } from '../auth/auth.repository';
import { HashService } from 'src/common/services/hash.service';
import { MailService } from 'src/config/mail.service';
import { User, UserSchema } from '../auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository, HashService, MailService, RolesGuard, AuthRepository],
})
export class TeacherModule { }
