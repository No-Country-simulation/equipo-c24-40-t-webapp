import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfessionalDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsOptional()
  @IsString()
  experience?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];
  @IsOptional()
  @IsNumber()
  rating?: number;
}
