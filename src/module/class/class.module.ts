import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolClass, SchoolClassSchema } from './class.schema';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchoolClass.name,
        schema: SchoolClassSchema,
      },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository, RolesGuard],
})
export class ClassModule {}
