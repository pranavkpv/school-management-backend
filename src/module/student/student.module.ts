import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { MailService } from 'src/config/mail.service';
import { User, UserSchema } from '../auth/user.schema';
import { HashService } from 'src/common/services/hash.service';
import { RolesGuard } from '../auth/guards/roles.guard';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository, MailService, HashService, RolesGuard],
})

export class StudentModule {}