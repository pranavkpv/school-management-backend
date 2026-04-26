import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Subject',
    required: true
  })
  subjectId!: Types.ObjectId;

  @Prop({ default: 0 })
  experience!: number;

  @Prop()
  contactInfo!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId!: Types.ObjectId;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);