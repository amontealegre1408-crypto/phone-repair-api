import { Entity, Column, OneToMany } from 'typeorm';
import { Phone } from '../phones/phone.entity';
import { BaseEntity } from '../../common/entities/base-entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Phone, (phone) => phone.customer, { cascade: true })
  phones: Phone[];
}
