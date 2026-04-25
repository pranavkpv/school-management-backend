import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {

   @Prop({ required: true })
   email!: string;

   @Prop({ required: true })
   password!: string;

   @Prop({ required: true, unique: true })
   role!: number;

}

export const StudentSchema =
   SchemaFactory.createForClass(Student);