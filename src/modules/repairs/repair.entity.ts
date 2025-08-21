import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Phone } from '../phones/phone.entity';
import { RepairStatus } from './enum/repair-status.enum';
import { BaseEntity } from '../../common/entities/base-entity';

@Entity('repairs')
export class Repair extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({
    type: 'enum',
    enum: RepairStatus,
    default: RepairStatus.PENDING,
  })
  status: RepairStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'date', nullable: true })
  estimatedCompletionDate: Date;

  @Column({ type: 'datetime', nullable: true })
  completedAt: Date;

  @Column('uuid')
  phoneId: string;

  @ManyToOne(() => Phone, (phone) => phone.repairs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phoneId' })
  phone: Phone;
}
