import { IsArray, IsString } from 'class-validator';

export class AssignTeacherSubjectsDto {
  @IsArray()
  @IsString({ each: true })
  subjectIds!: string[];
}
