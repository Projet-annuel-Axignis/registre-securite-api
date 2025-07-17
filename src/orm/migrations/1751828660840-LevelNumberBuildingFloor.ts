import { MigrationInterface, QueryRunner } from 'typeorm';

export class LevelNumberBuildingFloor1751828660840 implements MigrationInterface {
  name = 'LevelNumberBuildingFloor1751828660840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "building_floor"
        ADD "level_number" smallint NOT NULL DEFAULT '1'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "building_floor" DROP COLUMN "level_number"
    `);
  }
}
