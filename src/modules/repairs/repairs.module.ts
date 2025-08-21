import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from './repair.entity';
import { RepairsService } from './repairs.service';
import { RepairsController } from './repairs.controller';
import { RepairsRepository } from './repairs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Repair])],
  providers: [RepairsService, RepairsRepository],
  controllers: [RepairsController],
  exports: [RepairsService],
})
export class RepairsModule {}
