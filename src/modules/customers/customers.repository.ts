import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { IRepository } from '../../common/interfaces/repository.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersRepository implements IRepository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(customerData: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['phones'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllCustomer(page = 1, limit = 10): Promise<[Customer[], number]> {
    return this.customerRepository.findAndCount({
      relations: ['phones'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }


  async findById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['phones'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async findBy(criteria: Partial<Customer>): Promise<Customer[]> {
    return this.customerRepository.find({
      where: criteria,
      relations: ['phones'],
    });
  }

  async update(id: string, updates: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, updates);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }

  async findWithPhones(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['phones', 'phones.repairs'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    return customer;
  }
}
