import { IsMongoId } from 'class-validator';

export class CreateAssignmentDto {
  @IsMongoId()
  classId!: string;

  @IsMongoId()
  teacherId!: string;

  @IsMongoId()
  subjectId!: string;
}