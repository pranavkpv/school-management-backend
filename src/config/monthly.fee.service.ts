import {
 Injectable,
 Logger
} from '@nestjs/common';

import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeeSchedulerService {

 private readonly logger =
   new Logger(FeeSchedulerService.name);

 constructor(
   @InjectModel('Student')
   private studentModel: Model<any>,

   @InjectModel('FeeCollection')
   private feeModel: Model<any>,
 ) {}

 // At 00:00 on day 5 of every month
 @Cron('0 0 5 * *')
 async generateMonthlyFees() {

   this.logger.log(
    'Running monthly fee generation'
   );

   const students =
     await this.studentModel.find();

   const now = new Date();

   const monthOfPayment =
      `${now.getFullYear()}-${
        String(
          now.getMonth() + 1
        ).padStart(2,'0')
      }`;

   const feeDocs =
    students.map(student => ({
      studentId: student._id,
      amount: student.monthlyFee,
      paymentStatus: 'PENDING',
      paymentDate: null,
      monthOfPayment
    }));

   try {

     await this.feeModel.insertMany(
       feeDocs,
       { ordered: false } // skip duplicates
     );

     this.logger.log(
       'Monthly fees generated'
     );

   } catch(err) {

     this.logger.warn(
      'Some records already existed'
     );

   }
 }
}