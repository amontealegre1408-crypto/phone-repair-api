import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreatePhoneDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Phone brand',
  })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: 'iPhone 13',
    description: 'Phone model',
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: '356938035643809',
    description: 'Unique IMEI number of the phone',
  })
  @IsNotEmpty()
  imei: string;

  @ApiProperty({
    example: 'Black',
    description: 'Phone color (optional)',
    required: false,
  })
  @IsOptional()
  color?: string;

  @ApiProperty({
    example: 'Screen cracked, needs replacement',
    description: 'Additional notes (optional)',
    required: false,
  })
  @IsOptional()
  notes?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Customer ID (UUID) to whom this phone belongs',
  })
  @IsUUID()
  customerId: string;
}
