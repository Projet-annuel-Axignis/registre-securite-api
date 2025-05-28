import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentToPlan1748466831728 implements MigrationInterface {
  name = 'AddCommentToPlan1748466831728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "plan"
        ADD "comment" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "plan" DROP COLUMN "comment"
    `);
  }
}
