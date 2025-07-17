import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileDescription1752674173361 implements MigrationInterface {
  name = 'FileDescription1752674173361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "observation_file"
        ADD "description" character varying
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "observation_file" DROP COLUMN "description"
    `);
  }
}
