import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {

   @Prop({ required: true })
   name!: string;

   @Prop({ required: true })
   class!: string;

   @Prop({ required: true, unique: true })
   rollNumber!: number;

   @Prop()
   age!: number;

   @Prop()
   contactInfo!: string;

   @Prop({ required: true })
   userId!: string;

}

export const StudentSchema =
   SchemaFactory.createForClass(Student);