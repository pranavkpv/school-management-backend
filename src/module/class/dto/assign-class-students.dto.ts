import { IsArray, IsString } from 'class-validator';

export class AssignClassStudentsDto {
  @IsArray()
  @IsString({ each: true })
  studentIds!: string[];
}
