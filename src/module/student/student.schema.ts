import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {

   @Prop({ required: true })
   name!: string;

   @Prop({
      type: Types.ObjectId,
      ref: 'SchoolClass',
      required: true
   })
   classId!: Types.ObjectId;

   @Prop({ required: true, unique: true })
   rollNumber!: number;

   @Prop()
   age!: number;

   @Prop()
   contactInfo!: string;

   @Prop({
      type: Types.ObjectId,
      ref: 'User',
      required: true
   })
   userId!: Types.ObjectId;

}

export const StudentSchema =
   SchemaFactory.createForClass(Student);