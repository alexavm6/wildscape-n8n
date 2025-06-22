import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsMongoId,
  Min,
  IsOptional,
  IsDate,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsMongoId()
  campus_id?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  event_day?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  event_time?: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsMongoId()
  department_id?: string;

  @IsOptional()
  @IsMongoId()
  province_id?: string;

  @IsOptional()
  @IsMongoId()
  district_id?: string;

  @IsOptional()
  @IsMongoId()
  city_id?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_day?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_day?: Date;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
