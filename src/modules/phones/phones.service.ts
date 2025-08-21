import { Injectable, ConflictException } from '@nestjs/common';
import { PhonesRepository } from './phones.repository';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './phone.entity';

@Injectable()
export class PhonesService {
  constructor(private phonesRepository: PhonesRepository) {}

  async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const existingPhone = await this.phonesRepository.findBy({
      imei: createPhoneDto.imei,
    });

    if (existingPhone.length > 0) {
      throw new ConflictException('Phone with this IMEI already exists');
    }

    return this.phonesRepository.create(createPhoneDto);
  }

  async findAll(): Promise<Phone[]> {
    return this.phonesRepository.findAll();
  }

  async findById(id: string): Promise<Phone> {
    return this.phonesRepository.findById(id);
  }

  async findByCustomerId(customerId: string): Promise<Phone[]> {
    return this.phonesRepository.findByCustomerId(customerId);
  }

  async findWithRepairs(phoneId: string): Promise<Phone> {
    return this.phonesRepository.findWithRepairs(phoneId);
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    return this.phonesRepository.update(id, updatePhoneDto);
  }

  async delete(id: string): Promise<void> {
    return this.phonesRepository.delete(id);
  }
}
