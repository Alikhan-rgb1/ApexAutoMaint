import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ServiceOrder } from './service-order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => ServiceOrder, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: ServiceOrder;

  @Column({ type: 'varchar', length: 150, name: 'service_type' })
  serviceType!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 150, name: 'part_name', nullable: true })
  partName!: string | null;

  @Column({ type: 'varchar', length: 100, name: 'part_brand', nullable: true })
  partBrand!: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: string;

  @Column({ type: 'int', default: 1 })
  quantity!: number;
}
