import { IsEmail, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  classId?: string;

  @IsOptional()
  @IsInt()
  rollNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(100)
  age?: number;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
