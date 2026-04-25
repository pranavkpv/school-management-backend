import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Fees {

 @Prop({
   type: mongoose.Schema.Types.ObjectId,
   ref:'Student'
 })
 studentId!:string;

 @Prop()
 amount!:number;

 @Prop()
 dueDate!:Date;

 @Prop({
  enum:['Paid','Pending']
 })
 status!:string;

 @Prop()
 paypalOrderId!:string;
}

export const FeesSchema =
SchemaFactory.createForClass(Fees);