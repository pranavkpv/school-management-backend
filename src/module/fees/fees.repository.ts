import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}