import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { OrderItem } from './order-item.entity';

export const ServiceOrderStatuses = [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
] as const;

@Entity({ name: 'service_orders' })
export class ServiceOrder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'uuid', name: 'vehicle_id' })
  vehicleId!: string;

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle!: Vehicle;

  @Column({
    type: 'enum',
    enum: ServiceOrderStatuses,
    enumName: 'service_order_status_enum',
  })
  status!: (typeof ServiceOrderStatuses)[number];

  @Column({ type: 'int', name: 'mileage_at_service' })
  mileageAtService!: number;

  @Column({ type: 'text' })
  notes!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_price' })
  totalPrice!: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy!: string;

  @Column({ type: 'timestamptz', name: 'service_date' })
  serviceDate!: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  items?: OrderItem[];
}
