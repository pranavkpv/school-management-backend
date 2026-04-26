import {
   Controller,
   Get,
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
}