import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({timestamps:true})
export class Teacher {

 @Prop({required:true})
 name!:string;

 @Prop()
 subject!:string;

 @Prop()
 experience!:number;

 @Prop()
 contactInfo!:string;

 @Prop()
 password!:string;

 @Prop({unique:true})
 email!:string;

}

export const TeacherSchema =
SchemaFactory.createForClass(Teacher);