import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    return this.usersRepository.update(id, updates);
  }

  async delete(id: string, currentUser: User): Promise<void> {

    // Validar que no elimine su propia cuenta
    if (currentUser.id === id || currentUser.email === id) {
      throw new ForbiddenException('No puedes eliminar tu propia cuenta');
    }

    return this.usersRepository.delete(id);
  }
}
