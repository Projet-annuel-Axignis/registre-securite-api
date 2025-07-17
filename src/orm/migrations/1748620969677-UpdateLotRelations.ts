import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLotRelations1748620969677 implements MigrationInterface {
  name = 'UpdateLotRelations1748620969677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "lot"
        ADD "building_id" integer NOT NULL
    `);

    await queryRunner.query(`
        ALTER TABLE "lot"
        ADD CONSTRAINT "FK_6f45970ec40c114549825d4c7e7" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "lot" DROP CONSTRAINT "FK_6f45970ec40c114549825d4c7e7"
    `);

    await queryRunner.query(`
        ALTER TABLE "lot" DROP COLUMN "building_id"
    `);
  }
}
