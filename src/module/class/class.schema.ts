import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SchoolClassDocument = HydratedDocument<SchoolClass>;

@Schema({ timestamps: true })
export class SchoolClass {
  @Prop({ required: true, trim: true })
  className!: string;

  @Prop({ required: true })
  feesPerMonth!: number;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  durationMonths!: number;
}

export const SchoolClassSchema = SchemaFactory.createForClass(SchoolClass);