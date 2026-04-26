import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  subjectId!: string;

  @Prop({ default: 0 })
  experience!: number;

  @Prop()
  contactInfo!: string;

  @Prop({ required: true })
   userId!: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);