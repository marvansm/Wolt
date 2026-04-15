import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  items: any;

  @IsOptional()
  @IsString()
  venueComment?: string;

  @IsNotEmpty()
  @IsString()
  restaurantId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsNumber()
  tip?: number;

  @IsOptional()
  @IsString()
  deliveryMode?: string;

  @IsOptional()
  @IsString()
  deliveryTimeType?: string;

  @IsOptional()
  @IsBoolean()
  isGift?: boolean;

  @IsOptional()
  @IsString()
  courierNote?: string;
}
