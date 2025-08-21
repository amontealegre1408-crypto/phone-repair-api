import { Injectable, ConflictException } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customersRepository.findBy({
      email: createCustomerDto.email,
    });

    if (existingCustomer.length > 0) {
      throw new ConflictException('Customer with this email already exists');
    }

    return this.customersRepository.create(createCustomerDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page ?? 1; // default 1
    const limit = paginationDto.limit ?? 10; // default 10

    const [data, totalItems] = await this.customersRepository.findAllCustomer(
      page,
      limit,
    );

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<Customer> {
    return this.customersRepository.findById(id);
  }

  async findWithPhones(customerId: string): Promise<Customer> {
    return this.customersRepository.findWithPhones(customerId);
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersRepository.update(id, updateCustomerDto);
  }

  async delete(id: string): Promise<void> {
    return this.customersRepository.delete(id);
  }
}
