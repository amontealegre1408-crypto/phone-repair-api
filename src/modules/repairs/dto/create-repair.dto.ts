import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEnum,
  IsDateString,
  IsDecimal,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RepairStatus } from '../enum/repair-status.enum';

export class CreateRepairDto {
  @ApiProperty({
    example: 'Screen replacement',
    description: 'Description of the repair',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Screen cracked after a fall',
    description: 'Optional diagnosis details',
    required: false,
  })
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({
    example: RepairStatus.PENDING,
    enum: RepairStatus,
    description: 'Current repair status',
    required: false,
    default: RepairStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(RepairStatus)
  status?: RepairStatus = RepairStatus.PENDING;

  @ApiProperty({
    example: 120.5,
    description: 'Estimated repair cost',
  })
  @Transform(({ value }) => parseFloat(value))
  @IsDecimal({ decimal_digits: '2' })
  @Min(0)
  cost: number;

  @ApiProperty({
    example: '2025-09-10',
    description: 'Estimated completion date (optional)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  estimatedCompletionDate?: Date;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Phone ID related to this repair',
  })
  @IsUUID()
  phoneId: string;
}
