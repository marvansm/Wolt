import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
