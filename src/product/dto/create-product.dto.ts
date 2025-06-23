import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsMongoId,
  Min,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  /* ---------- Datos básicos ---------- */
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  /* ---------- Relaciones ---------- */
  @IsOptional()
  @IsMongoId()
  activity_id?: string;

  @IsOptional()
  @IsMongoId()
  category_id?: string;

  @IsOptional()
  @IsMongoId()
  risk_id?: string;

  @IsOptional()
  @IsMongoId()
  campus_id?: string;

  /* ---------- Capacidad y precio ---------- */
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  registered?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  /* ---------- Imagen ---------- */
  @IsOptional()
  @IsString()
  image?: string;

  /* ---------- Fecha y hora ---------- */
  @IsOptional()
  @IsString()
  activity_day?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  activity_duration?: number;

  @IsOptional()
  @IsString()
  activity_time?: string;

  /* ---------- Ubicación (división política) ---------- */
  @IsOptional()
  @IsMongoId()
  activity_department_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_province_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_district_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_city_id?: string;

  /* ---------- Dirección específica ---------- */
  @IsOptional()
  @IsString()
  activity_address?: string;

  /* ---------- Disponibilidad ---------- */
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @IsOptional()
  @IsBoolean()
  registration_availability?: boolean;

  /* ---------- NUEVOS CAMPOS ---------- */
  @IsOptional()
  @IsMongoId()
  location_reference_id?: string;

  @IsOptional()
  @IsString()
  location_description?: string;
}
