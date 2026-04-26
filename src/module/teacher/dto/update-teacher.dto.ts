import { IsArray, IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
