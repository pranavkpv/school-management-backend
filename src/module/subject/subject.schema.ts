import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true, unique: true, trim: true })
  name!: string;

  @Prop({ type: [String], default: [] })
  teacherIds!: string[];

  @Prop({ type: [String], default: [] })
  classIds!: string[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
