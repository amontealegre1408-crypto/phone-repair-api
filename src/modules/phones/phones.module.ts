import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { PhonesRepository } from './phones.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhonesService, PhonesRepository],
  controllers: [PhonesController],
  exports: [PhonesService],
})
export class PhonesModule {}
