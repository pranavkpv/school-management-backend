import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

@Schema({ timestamps: true })
export class FeeCollection extends Document {

  @Prop({
    type: Types.ObjectId,
    ref: 'Student',
    required: true
  })
  studentId!: Types.ObjectId;

  @Prop({
    required: true
  })
  amount!: number;

  @Prop({
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus!: PaymentStatus;

  @Prop()
  paymentDate!: Date;

  @Prop({
    required: true
  })
  monthOfPayment!: string; // 2026-06
}

export const FeeCollectionSchema =
  SchemaFactory.createForClass(FeeCollection);

// Prevent duplicate month entries per student
FeeCollectionSchema.index(
  {
    studentId: 1,
    monthOfPayment: 1
  },
  {
    unique: true
  }
);