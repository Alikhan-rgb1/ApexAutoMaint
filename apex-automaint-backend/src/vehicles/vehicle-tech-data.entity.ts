import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Vehicle } from './vehicle.entity.js';

@Entity({ name: 'vehicle_tech_data' })
export class VehicleTechData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'vehicle_id' })
  vehicleId!: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.techData, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle!: Vehicle;

  @Column({ type: 'varchar', length: 100, name: 'oil_brand' })
  oilBrand!: string;

  @Column({ type: 'varchar', length: 20, name: 'oil_viscosity' })
  oilViscosity!: string;

  @Column({ type: 'int', name: 'oil_change_mileage' })
  oilChangeMileage!: number;

  @Column({ type: 'int', name: 'oil_next_change_km' })
  oilNextChangeKm!: number;

  @Column({ type: 'varchar', length: 20, name: 'transmission_type' })
  transmissionType!: string;

  @Column({ type: 'varchar', length: 100, name: 'transmission_oil' })
  transmissionOil!: string;

  @Column({ type: 'int', name: 'transmission_oil_change_mileage' })
  transmissionOilChangeMileage!: number;

  @Column({ type: 'varchar', length: 30, name: 'tire_size' })
  tireSize!: string;

  @Column({ type: 'varchar', length: 20, name: 'tire_type' })
  tireType!: string;

  @Column({ type: 'int', name: 'brake_pad_front_mm' })
  brakePadFrontMm!: number;

  @Column({ type: 'int', name: 'brake_pad_rear_mm' })
  brakePadRearMm!: number;

  @Column({ type: 'varchar', length: 100, name: 'air_filter_brand' })
  airFilterBrand!: string;

  @Column({ type: 'varchar', length: 100, name: 'cabin_filter_brand' })
  cabinFilterBrand!: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;
}
