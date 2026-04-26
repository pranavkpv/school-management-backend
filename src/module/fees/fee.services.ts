import {
 Injectable
} from '@nestjs/common';
import { FeeRepository } from './fees.repository';



@Injectable()
export class FeeService {

 constructor(
   private readonly feeRepository: FeeRepository
 ) {}

 async getPendingFees(
   studentId: string
 ) {

   const fees =
    await this.feeRepository
      .getPendingFeesByStudentId(
         studentId
      );

   return fees.map(fee => ({

      amount:
        fee.amount,

      paymentStatus:
        fee.paymentStatus,

      monthOfPayment:
        fee.monthOfPayment
   }));
 }
}