import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Class {

 @Prop()
 className!:string;

 @Prop()
 subject!:string;

 @Prop()
 name!:string;

 @Prop({
   type: mongoose.Schema.Types.ObjectId,
   ref:'Teacher'
 })
 teacherId!:string;

 @Prop({
   type: mongoose.Schema.Types.ObjectId,
   ref:'Student'
 })
 classId!:string;
}

export const ClassSchema =
SchemaFactory.createForClass(Class);