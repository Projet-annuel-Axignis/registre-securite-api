import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentToObservation1752675148817 implements MigrationInterface {
  name = 'AddCommentToObservation1752675148817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "observation"
        ADD "comment" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "observation" DROP COLUMN "comment"
    `);
  }
}
