import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateRepairDto } from './create-repair.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateRepairDto extends PartialType(
  OmitType(CreateRepairDto, ['phoneId'] as const),
) {
  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}
