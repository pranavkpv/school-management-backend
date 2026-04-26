import { IsNotEmpty, IsString } from 'class-validator';

export class AssignClassTeacherDto {
  @IsString()
  @IsNotEmpty()
  teacherId!: string;
}
