import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teacherIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  classIds?: string[];
}
