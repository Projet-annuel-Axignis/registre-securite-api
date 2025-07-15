import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportEquipment1752578534162 implements MigrationInterface {
  name = 'ReportEquipment1752578534162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "report_equipment" (
            "id" SERIAL NOT NULL,
            "equipment_id" integer NOT NULL,
            "report_id" integer,
            CONSTRAINT "PK_524b3520d4478ef1c1158b2d197" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "report_equipment"
        ADD CONSTRAINT "FK_d6bef6c82e58f806a7b3d3bcbd7" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "report_equipment" DROP CONSTRAINT "FK_d6bef6c82e58f806a7b3d3bcbd7"
    `);
    await queryRunner.query(`
        DROP TABLE "report_equipment"
    `);
  }
}
