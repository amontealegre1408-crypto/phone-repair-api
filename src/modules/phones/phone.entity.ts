import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Repair } from '../repairs/repair.entity';
import { BaseEntity } from '../../common/entities/base-entity';

@Entity('phones')
export class Phone extends BaseEntity {
  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ unique: true })
  imei: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column('uuid')
  customerId: string;

  @ManyToOne(() => Customer, (customer) => customer.phones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => Repair, (repair) => repair.phone, { cascade: true })
  repairs: Repair[];

}
