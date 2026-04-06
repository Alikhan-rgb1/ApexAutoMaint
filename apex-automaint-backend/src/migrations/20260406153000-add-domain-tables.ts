import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDomainTables20260406153000 implements MigrationInterface {
  name = 'AddDomainTables20260406153000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
          CREATE TYPE "user_role_enum" AS ENUM ('client','mechanic','admin');
        END IF;
      END$$;
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "role" "user_role_enum" NOT NULL DEFAULT 'client';
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_order_status_enum') THEN
          CREATE TYPE "service_order_status_enum" AS ENUM ('pending','in_progress','completed','cancelled');
        END IF;
      END$$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vehicles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "make" varchar(100) NOT NULL,
        "model" varchar(100) NOT NULL,
        "year" int NOT NULL,
        "vin" varchar(50),
        "current_mileage" int NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vehicle_tech_data" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "vehicle_id" uuid NOT NULL UNIQUE REFERENCES "vehicles"("id") ON DELETE CASCADE,
        "oil_brand" varchar(100) NOT NULL,
        "oil_viscosity" varchar(20) NOT NULL,
        "oil_change_mileage" int NOT NULL,
        "oil_next_change_km" int NOT NULL,
        "transmission_type" varchar(20) NOT NULL,
        "transmission_oil" varchar(100) NOT NULL,
        "transmission_oil_change_mileage" int NOT NULL,
        "tire_size" varchar(30) NOT NULL,
        "tire_type" varchar(20) NOT NULL,
        "brake_pad_front_mm" int NOT NULL,
        "brake_pad_rear_mm" int NOT NULL,
        "air_filter_brand" varchar(100) NOT NULL,
        "cabin_filter_brand" varchar(100) NOT NULL,
        "updated_at" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "service_orders" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "vehicle_id" uuid NOT NULL REFERENCES "vehicles"("id") ON DELETE CASCADE,
        "status" "service_order_status_enum" NOT NULL,
        "mileage_at_service" int NOT NULL,
        "notes" text NOT NULL,
        "total_price" decimal(12,2) NOT NULL,
        "created_by" uuid NOT NULL,
        "service_date" timestamptz NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "order_id" uuid NOT NULL REFERENCES "service_orders"("id") ON DELETE CASCADE,
        "service_type" varchar(150) NOT NULL,
        "description" text NOT NULL,
        "part_name" varchar(150),
        "part_brand" varchar(100),
        "price" decimal(12,2) NOT NULL,
        "quantity" int NOT NULL DEFAULT 1
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "notifications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "vehicle_id" uuid NOT NULL REFERENCES "vehicles"("id") ON DELETE CASCADE,
        "type" varchar(50) NOT NULL,
        "channel" varchar(20) NOT NULL,
        "message" text NOT NULL,
        "is_sent" boolean NOT NULL DEFAULT false,
        "scheduled_at" timestamptz NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_vehicles_user_id" ON "vehicles"("user_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_service_orders_user_id" ON "service_orders"("user_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_service_orders_vehicle_id" ON "service_orders"("vehicle_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_order_items_order_id" ON "order_items"("order_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_notifications_user_id" ON "notifications"("user_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "idx_notifications_vehicle_id" ON "notifications"("vehicle_id")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "notifications"');
    await queryRunner.query('DROP TABLE IF EXISTS "order_items"');
    await queryRunner.query('DROP TABLE IF EXISTS "service_orders"');
    await queryRunner.query('DROP TABLE IF EXISTS "vehicle_tech_data"');
    await queryRunner.query('DROP TABLE IF EXISTS "vehicles"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN IF EXISTS "role"');
    await queryRunner.query('DROP TYPE IF EXISTS "service_order_status_enum"');
    await queryRunner.query('DROP TYPE IF EXISTS "user_role_enum"');
  }
}
