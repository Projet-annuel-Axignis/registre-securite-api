import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePlanRelations1751035151621 implements MigrationInterface {
  name = 'UpdatePlanRelations1751035151621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "company" DROP CONSTRAINT "FK_dd3d979b6c62d4e5ad3ff2fb44a"
    `);
    await queryRunner.query(`
        ALTER TABLE "company" DROP COLUMN "plan_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "plan"
        ADD "company_id" integer
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        ALTER COLUMN "siret_number"
        SET NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "plan"
        ADD CONSTRAINT "FK_50b272105ef8649d27fb2b907a7" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "plan" DROP CONSTRAINT "FK_50b272105ef8649d27fb2b907a7"
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        ALTER COLUMN "siret_number" DROP NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "plan" DROP COLUMN "company_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        ADD "plan_id" integer
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        ADD CONSTRAINT "FK_dd3d979b6c62d4e5ad3ff2fb44a" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "plan" DROP COLUMN "company_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        DROP COLUMN "plan_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        DROP CONSTRAINT "FK_dd3d979b6c62d4e5ad3ff2fb44a"
    `);
  }
}
