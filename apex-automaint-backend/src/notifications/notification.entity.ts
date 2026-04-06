import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity({ name: 'notifications' })
export class Notification {
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

  @Column({ type: 'varchar', length: 50 })
  type!: string;

  @Column({ type: 'varchar', length: 20 })
  channel!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'boolean', name: 'is_sent', default: false })
  isSent!: boolean;

  @Column({ type: 'timestamptz', name: 'scheduled_at' })
  scheduledAt!: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
