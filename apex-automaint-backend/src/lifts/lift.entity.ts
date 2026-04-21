import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Vehicle } from '../vehicles/vehicle.entity.js';

@Entity({ name: 'lifts' })
export class Lift {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, name: 'group_name' })
  group!: string;

  @Column({ type: 'varchar', length: 50, default: 'available' })
  status!: string;

  @Column({ type: 'varchar', length: 100, name: 'work_time', nullable: true })
  workTime!: string | null;

  @Column({ type: 'varchar', length: 150, name: 'work_type', nullable: true })
  workType!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  mechanic!: string | null;

  @Column({ type: 'uuid', name: 'vehicle_id', nullable: true })
  vehicleId!: string | null;

  @ManyToOne(() => Vehicle, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle!: Vehicle | null;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
