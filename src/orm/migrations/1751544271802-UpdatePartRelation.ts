import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePartRelation1751544271802 implements MigrationInterface {
  name = 'UpdatePartRelation1751544271802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "part" DROP CONSTRAINT "FK_54e4f2e182d298ecc381d230dbf"
    `);
    await queryRunner.query(`
        ALTER TABLE "part" DROP COLUMN "part_floor_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_floor"
        ADD "part_id" integer NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "part_floor"
        ADD CONSTRAINT "FK_fa09d48186db12d572ace7b6b33" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "part_floor" DROP CONSTRAINT "FK_fa09d48186db12d572ace7b6b33"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_floor" DROP COLUMN "part_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "part"
        ADD "part_floor_id" integer NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "part"
        ADD CONSTRAINT "FK_54e4f2e182d298ecc381d230dbf" FOREIGN KEY ("part_floor_id") REFERENCES "part_floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }
}
