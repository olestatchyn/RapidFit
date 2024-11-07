import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsArray()
  specialization: string[];
}
