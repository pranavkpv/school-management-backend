import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  className?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  feesPerMonth?: number;

  @IsDateString()
  @IsNotEmpty()
  startDate?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  durationMonths?: number;
}