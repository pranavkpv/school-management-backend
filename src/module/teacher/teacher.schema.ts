import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ type: [String], default: [] })
  subjectIds!: string[];

  @Prop({ default: 0 })
  experience!: number;

  @Prop()
  contactInfo!: string;

  @Prop()
  email!: string;

  @Prop()
  userId!: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);