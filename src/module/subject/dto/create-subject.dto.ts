import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teacherIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  classIds?: string[];
}
