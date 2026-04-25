import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attendance {

 @Prop({
   type: mongoose.Schema.Types.ObjectId,
   ref:'Student'
 })
 studentId!:string;

 @Prop({
   type: mongoose.Schema.Types.ObjectId,
   ref:'Class'
 })
 classId!:string;

 @Prop()
 date!:Date;

 @Prop({
  enum:['Present','Absent']
 })
 status!:string;
}

export const AttendanceSchema =
SchemaFactory.createForClass(Attendance);