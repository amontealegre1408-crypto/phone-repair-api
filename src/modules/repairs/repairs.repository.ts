import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repair } from './repair.entity';
import { IRepository } from '../../common/interfaces/repository.interface';
import { CreateRepairDto } from './dto/create-repair.dto';
import { RepairQueryDto } from './dto/repair-query.dto';

@Injectable()
export class RepairsRepository implements IRepository<Repair> {
  constructor(
    @InjectRepository(Repair)
    private repairRepository: Repository<Repair>,
  ) {}

  async create(repairData: CreateRepairDto): Promise<Repair> {
    const repair = this.repairRepository.create(repairData);
    return this.repairRepository.save(repair);
  }

  async findAll(): Promise<Repair[]> {
    return this.repairRepository.find({
      relations: ['phone', 'phone.customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllWithCount(): Promise<{ data: Repair[]; total: number }> {
    const [data, total] = await this.repairRepository.findAndCount({
      relations: ['phone', 'phone.customer'],
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findById(id: string): Promise<Repair> {
    const repair = await this.repairRepository.findOne({
      where: { id },
      relations: ['phone', 'phone.customer'],
    });

    if (!repair) {
      throw new NotFoundException(`Repair with ID ${id} not found`);
    }

    return repair;
  }

  async findBy(criteria: Partial<Repair>): Promise<Repair[]> {
    return this.repairRepository.find({
      where: criteria,
      relations: ['phone', 'phone.customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findWithFilters(
    queryDto: RepairQueryDto,
  ): Promise<{ data: Repair[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      statusRepair,
      startDate,
      endDate,
      phoneId,
      customerId,
    } = queryDto;

    const queryBuilder = this.repairRepository
      .createQueryBuilder('repair')
      .leftJoinAndSelect('repair.phone', 'phone')
      .leftJoinAndSelect('phone.customer', 'customer')
      .orderBy('repair.createdAt', 'DESC');

    // Apply filters
    if (statusRepair) {
      queryBuilder.andWhere('repair.status = :status', { statusRepair });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'repair.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    if (phoneId) {
      queryBuilder.andWhere('repair.phoneId = :phoneId', { phoneId });
    }

    if (customerId) {
      queryBuilder.andWhere('phone.customerId = :customerId', { customerId });
    }

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async findByPhoneId(phoneId: string): Promise<Repair[]> {
    return this.repairRepository.find({
      where: { phoneId },
      relations: ['phone'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllOrderedByDate(): Promise<Repair[]> {
    return this.repairRepository.find({
      relations: ['phone', 'phone.customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updates: Partial<Repair>): Promise<Repair> {
    await this.repairRepository.update(id, updates);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repairRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Repair with ID ${id} not found`);
    }
  }
}
