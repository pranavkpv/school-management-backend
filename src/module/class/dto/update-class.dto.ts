import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  className?: string;

  @IsOptional()
  @IsNumber()
  feesPerMonth?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsNumber()
  durationMonths?: number;

}