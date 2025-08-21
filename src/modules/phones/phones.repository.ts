import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './phone.entity';
import { IRepository } from '../../common/interfaces/repository.interface';
import { CreatePhoneDto } from './dto/create-phone.dto';

@Injectable()
export class PhonesRepository implements IRepository<Phone> {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async create(phoneData: CreatePhoneDto): Promise<Phone> {
    const phone = this.phoneRepository.create(phoneData);
    return this.phoneRepository.save(phone);
  }

  async findAll(): Promise<Phone[]> {
    return this.phoneRepository.find({
      relations: ['customer', 'repairs'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({
      where: { id },
      relations: ['customer', 'repairs'],
    });

    if (!phone) {
      throw new NotFoundException(`Phone with ID ${id} not found`);
    }

    return phone;
  }

  async findBy(criteria: Partial<Phone>): Promise<Phone[]> {
    return this.phoneRepository.find({
      where: criteria,
      relations: ['customer', 'repairs'],
    });
  }

  async findByCustomerId(customerId: string): Promise<Phone[]> {
    return this.phoneRepository.find({
      where: { customerId },
      relations: ['repairs'],
      order: { createdAt: 'DESC' },
    });
  }

  async findWithRepairs(phoneId: string): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({
      where: { id: phoneId },
      relations: ['customer', 'repairs'],
    });

    if (!phone) {
      throw new NotFoundException(`Phone with ID ${phoneId} not found`);
    }

    return phone;
  }

  async update(id: string, updates: Partial<Phone>): Promise<Phone> {
    await this.phoneRepository.update(id, updates);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.phoneRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Phone with ID ${id} not found`);
    }
  }
}
