import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../modules/users/users.service';
import { CustomersService } from '../../modules/customers/customers.service';
import { PhonesService } from '../../modules/phones/phones.service';
import { RepairsService } from '../../modules/repairs/repairs.service';

import * as bcrypt from 'bcryptjs';
import { UserRole } from '../../modules/auth/enum/role.enum';
import { RepairStatus } from '../../modules/repairs/enum/repair-status.enum';

async function seed() {
  const app = await NestFactory.create(AppModule);

  const usersService = app.get(UsersService);
  const customersService = app.get(CustomersService);
  const phonesService = app.get(PhonesService);
  const repairsService = app.get(RepairsService);

  console.log('🌱 Starting database seeding...');

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await usersService.create({
      email: 'admin@phonerepair.com',
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });
    console.log('✅ Admin user created');

    // Create manager user
    const managerUser = await usersService.create({
      email: 'manager@phonerepair.com',
      firstName: 'Manager',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.MANAGER,
      isActive: true,
    });
    console.log('✅ Manager user created');

    // Create sample customers
    const customer1 = await customersService.create({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '+57 300 123 4567',
      address: 'Calle 123 #45-67, Neiva',
    });

    const customer2 = await customersService.create({
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@email.com',
      phone: '+57 315 987 6543',
      address: 'Carrera 8 #12-34, Neiva',
    });
    console.log('✅ Sample customers created');

    // Create sample phones
    const phone1 = await phonesService.create({
      brand: 'iPhone',
      model: '14 Pro',
      imei: '123456789012345',
      color: 'Space Black',
      notes: 'Cliente reporta pantalla rota',
      customerId: customer1.id,
    });

    const phone2 = await phonesService.create({
      brand: 'Samsung',
      model: 'Galaxy S23',
      imei: '987654321098765',
      color: 'Phantom Black',
      notes: 'No carga la batería',
      customerId: customer2.id,
    });

    const phone3 = await phonesService.create({
      brand: 'Xiaomi',
      model: 'Mi 11',
      imei: '456789123456789',
      color: 'Blue',
      customerId: customer1.id,
    });
    console.log('✅ Sample phones created');

    // Create sample repairs
    const repair1 = await repairsService.create({
      description: 'Cambio de pantalla LCD completa',
      diagnosis: 'Pantalla rota por caída, táctil funcional',
      status: RepairStatus.COMPLETED,
      cost: 250000,
      estimatedCompletionDate: new Date('2024-01-15'),
      phoneId: phone1.id,
    });

    const repair2 = await repairsService.create({
      description: 'Reparación puerto de carga',
      diagnosis: 'Puerto de carga dañado, requiere reemplazo',
      status: RepairStatus.IN_PROGRESS,
      cost: 80000,
      estimatedCompletionDate: new Date('2024-01-20'),
      phoneId: phone2.id,
    });

    const repair3 = await repairsService.create({
      description: 'Cambio de batería',
      diagnosis: 'Batería hinchada, requiere reemplazo urgente',
      status: RepairStatus.PENDING,
      cost: 120000,
      phoneId: phone3.id,
    });

    // Update completed repair
    await repairsService.update(repair1.id, {
      completedAt: new Date(),
      status: RepairStatus.COMPLETED,
    });

    console.log('✅ Sample repairs created');
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seed();
