import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeeCollection, PaymentStatus } from './fees.schema';



@Injectable()
export class FeeRepository {

 constructor(
   @InjectModel(FeeCollection.name)
   private readonly feeModel: Model<FeeCollection>
 ) {}

 async getPendingFeesByStudentId(
   studentId: string
 ) {

   return this.feeModel
     .find({
       studentId,
       paymentStatus: PaymentStatus.PENDING
     })
     .populate(
       'studentId'
     )
     .lean();
 }

 async findById(id: string): Promise<FeeCollection | null> {
    return this.feeModel.findById(new Types.ObjectId(id)).exec();
  }

  async findByStudentId(studentId: string): Promise<FeeCollection[]> {
    return this.feeModel
      .find({ studentId: new Types.ObjectId(studentId) })
      .exec();
  }

  async markAsPaid(id: string): Promise<FeeCollection | null> {
    return this.feeModel
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          paymentStatus: PaymentStatus.PAID,
          paymentDate: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}