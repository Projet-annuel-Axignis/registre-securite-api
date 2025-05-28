import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentToPlan1748467487840 implements MigrationInterface {
  name = 'AddCommentToPlan1748467487840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "plan"
        ADD "siret_number" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "plan"
        ADD "comment" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "plan" DROP COLUMN "comment"
    `);
    await queryRunner.query(`
        ALTER TABLE "plan" DROP COLUMN "siret_number"
    `);
  }
}
