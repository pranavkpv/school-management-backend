import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { ClassTeacherAssignmentController } from './class-teacher-assignment.controller';
import { ClassTeacherAssignmentService } from './class-teacher-assignment.service';
import { ClassTeacherAssignmentRepository } from './class-teacher-assignment.repository';
import { ClassTeacherAssignment, ClassTeacherAssignmentSchema } from './class-teacher-assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClassTeacherAssignment.name,
        schema: ClassTeacherAssignmentSchema,
      },
    ]),
  ],
  controllers: [ClassTeacherAssignmentController],
  providers: [
    ClassTeacherAssignmentService,
    ClassTeacherAssignmentRepository,
  ],
})
export class ClassTeacherAssignmentModule {}