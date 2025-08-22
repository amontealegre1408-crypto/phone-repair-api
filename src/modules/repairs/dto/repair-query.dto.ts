import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { RepairStatus } from '../enum/repair-status.enum';

export class RepairQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(RepairStatus)
  statusRepair?: RepairStatus;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @IsOptional()
  phoneId?: string;

  @IsOptional()
  customerId?: string;
}
