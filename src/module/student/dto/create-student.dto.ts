import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  class!: string;

  @IsInt()
  rollNumber!: number;

  @IsInt()
  @Min(3)
  @Max(100)
  age!: number;

  @IsString()
  @IsNotEmpty()
  contactInfo!: string;

  @IsEmail()
  email!: string;
}
