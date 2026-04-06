import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { VehicleTechData } from './vehicle-tech-data.entity.js';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 100 })
  make!: string;

  @Column({ type: 'varchar', length: 100 })
  model!: string;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vin!: string | null;

  @Column({ type: 'int', name: 'current_mileage' })
  currentMileage!: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @OneToOne(() => VehicleTechData, (tech: VehicleTechData) => tech.vehicle)
  techData?: VehicleTechData;
}
