import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLifts20260421120000 implements MigrationInterface {
  name = 'AddLifts20260421120000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "lifts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(100) NOT NULL,
        "group_name" varchar(100) NOT NULL,
        "status" varchar(50) NOT NULL DEFAULT 'available',
        "work_time" varchar(100),
        "work_type" varchar(150),
        "notes" text,
        "mechanic" varchar(120),
        "vehicle_id" uuid REFERENCES "vehicles"("id") ON DELETE SET NULL,
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_lifts_group_name" ON "lifts"("group_name")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_lifts_vehicle_id" ON "lifts"("vehicle_id")
    `);

    await queryRunner.query(`
      INSERT INTO "lifts" ("name", "group_name", "status")
      SELECT * FROM (VALUES
        ('LIFT 1','LIFT 1','available'),
        ('LIFT 2','LIFT 2','available'),
        ('LIFT 3','LIFT 3','available'),
        ('PAINT BOOTH','PAINT BOOTH','available')
      ) AS v("name","group_name","status")
      WHERE NOT EXISTS (SELECT 1 FROM "lifts")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "lifts"');
  }
}
