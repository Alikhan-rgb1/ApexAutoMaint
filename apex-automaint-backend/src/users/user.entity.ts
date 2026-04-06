import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  static Roles = ['client', 'mechanic', 'admin'] as const;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 320 })
  email!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'varchar', length: 200 })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: User.Roles,
    enumName: 'user_role_enum',
    default: 'client',
  })
  role!: (typeof User.Roles)[number];

  @Column({ type: 'varchar', length: 100, nullable: true })
  carMake!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carModel!: string | null;

  @Column({ type: 'int', nullable: true })
  carYear!: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  serviceType!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
