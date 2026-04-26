import {
   Controller,
   Get,
   HttpCode,
   Param,
   Post,
   Query,
   Req,
   UseGuards
} from '@nestjs/common';


import { JwtAuthGuard }
   from '../auth/guards/jwt-auth.guard';
import { FeeService } from './fee.services';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE } from 'src/common/constants/role.enum';
import { Roles } from '../auth/roles.decorator';
import { ROUTES } from 'src/common/constants/routes.constants';

@Controller(ROUTES.STUDENT.FEES)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.STUDENT)
export class FeeController {

   constructor(
      private readonly feeService: FeeService
   ) { }
   @Get()
   async getPendingFees(
      @Req() req
   ) {

      const studentId =
         req.user.userId;

      return this.feeService
         .getPendingFees(studentId);
   }
   // Step 1: Create PayPal order → return approval URL
   @Post(':feeId/pay')
   @HttpCode(200)
   async initiatePayment(@Param('feeId') feeId: string) {
      return this.feeService.createPaypalOrder(feeId);
      // Returns: { approvalUrl: "https://paypal.com/...", orderId: "..." }
   }
   // Step 2: PayPal redirects here after user approves
   // Called by frontend after redirect with ?token=&feeId=
   @Post('capture')
   @HttpCode(200)
   async capturePayment(
      @Query('orderId') orderId: string,
      @Query('feeId') feeId: string,
   ) {
      const fee = await this.feeService.capturePaypalOrder(orderId, feeId);
      return { success: true, fee };
   }
}