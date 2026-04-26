import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeCollection, FeeCollectionSchema } from './fees.schema';
import { Student, StudentSchema } from '../student/student.schema';
import { FeeController } from './fees.controller';
import { FeeService } from './fee.services';
import { FeeRepository } from './fees.repository';


@Module({
 imports: [
   MongooseModule.forFeature([
    {
      name: FeeCollection.name,
      schema: FeeCollectionSchema
    },
    {
      name: Student.name,
      schema: StudentSchema
    }
   ])
 ],
 controllers: [
   FeeController
 ],
 providers: [
   FeeService,
   FeeRepository
 ],
})
export class FeeModule {}