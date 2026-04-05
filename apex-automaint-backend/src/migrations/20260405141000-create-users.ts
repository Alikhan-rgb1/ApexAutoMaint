import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers20260405141000 implements MigrationInterface {
  name = 'CreateUsers20260405141000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" varchar(320) NOT NULL UNIQUE,
        "name" varchar(200) NOT NULL,
        "phone" varchar(50) NOT NULL,
        "passwordHash" varchar(200) NOT NULL,
        "carMake" varchar(100),
        "carModel" varchar(100),
        "carYear" int,
        "serviceType" varchar(50),
        "createdAt" timestamptz NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "users"');
  }
}
