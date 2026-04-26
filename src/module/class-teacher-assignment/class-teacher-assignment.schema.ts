import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClassTeacherAssignmentDocument =
  HydratedDocument<ClassTeacherAssignment>;

@Schema({ timestamps: true })
export class ClassTeacherAssignment {
  @Prop({ type: Types.ObjectId, ref: 'SchoolClass', required: true })
  classId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacherId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
  subjectId!: Types.ObjectId;
}

export const ClassTeacherAssignmentSchema =
  SchemaFactory.createForClass(ClassTeacherAssignment);