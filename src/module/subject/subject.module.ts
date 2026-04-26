import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.schema';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subject.name,
        schema: SubjectSchema,
      },
    ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, RolesGuard],
})
export class SubjectModule {}
