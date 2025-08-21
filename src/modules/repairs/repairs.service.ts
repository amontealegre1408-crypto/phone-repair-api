import { BadRequestException, Injectable } from '@nestjs/common';
import { RepairsRepository } from './repairs.repository';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { RepairQueryDto } from './dto/repair-query.dto';
import { Repair } from './repair.entity';
import { RepairStatus } from './enum/repair-status.enum';

@Injectable()
export class RepairsService {
  constructor(private repairsRepository: RepairsRepository) {}

  async create(createRepairDto: CreateRepairDto): Promise<Repair> {
    return this.repairsRepository.create(createRepairDto);
  }

  async findById(id: string): Promise<Repair> {
    return this.repairsRepository.findById(id);
  }

  async findWithFilters(queryDto: RepairQueryDto) {
    return this.repairsRepository.findWithFilters(queryDto);
  }

  async findByPhoneId(phoneId: string): Promise<Repair[]> {
    return this.repairsRepository.findByPhoneId(phoneId);
  }

  async findAllOrderedByDate(): Promise<Repair[]> {
    return this.repairsRepository.findAllOrderedByDate();
  }

  async findAllWithCount() {
    return this.repairsRepository.findAllWithCount();
  }

  async update(id: string, updateRepairDto: UpdateRepairDto): Promise<Repair> {
    // Auto-set completedAt when status changes to completed
    if (
      updateRepairDto.status === RepairStatus.COMPLETED &&
      !updateRepairDto.completedAt
    ) {
      updateRepairDto.completedAt = new Date();
    }

    // Validate that completedAt is only set when status is completed
    if (
      updateRepairDto.completedAt &&
      updateRepairDto.status !== RepairStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'CompletedAt can only be set when status is completed',
      );
    }

    return this.repairsRepository.update(id, updateRepairDto);
  }

  async delete(id: string): Promise<void> {
    return this.repairsRepository.delete(id);
  }

  // 🔹 Aquí también conviene usar findAllWithCount para evitar dos consultas
  async getRepairStatistics() {
    const { data: repairs, total } =
      await this.repairsRepository.findAllWithCount();

    return {
      total,
      pending: repairs.filter((r) => r.status === RepairStatus.PENDING).length,
      inProgress: repairs.filter((r) => r.status === RepairStatus.IN_PROGRESS)
        .length,
      completed: repairs.filter((r) => r.status === RepairStatus.COMPLETED)
        .length,
      delivered: repairs.filter((r) => r.status === RepairStatus.DELIVERED)
        .length,
      cancelled: repairs.filter((r) => r.status === RepairStatus.CANCELLED)
        .length,
      totalRevenue: repairs
        .filter((r) => r.status === RepairStatus.DELIVERED)
        .reduce((sum, r) => sum + Number(r.cost), 0),
    };
  }
}
