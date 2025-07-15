import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyPartIntervention1752560280264 implements MigrationInterface {
  name = 'ManyToManyPartIntervention1752560280264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "part_interventions_intervention" (
            "part_id" integer NOT NULL,
            "intervention_id" integer NOT NULL,
            CONSTRAINT "PK_b06c38619c7f36918fb17e50d4a" PRIMARY KEY ("part_id", "intervention_id")
        )
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_40a88a150986beb5fa07ac2787" ON "part_interventions_intervention" ("part_id")
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_480059ebccda8e1b07a8da6702" ON "part_interventions_intervention" ("intervention_id")
    `);
    await queryRunner.query(`
        ALTER TABLE "part_interventions_intervention"
        ADD CONSTRAINT "FK_40a88a150986beb5fa07ac27876" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
        ALTER TABLE "part_interventions_intervention"
        ADD CONSTRAINT "FK_480059ebccda8e1b07a8da67027" FOREIGN KEY ("intervention_id") REFERENCES "intervention"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "part_interventions_intervention" DROP CONSTRAINT "FK_480059ebccda8e1b07a8da67027"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_interventions_intervention" DROP CONSTRAINT "FK_40a88a150986beb5fa07ac27876"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_480059ebccda8e1b07a8da6702"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_40a88a150986beb5fa07ac2787"
    `);
    await queryRunner.query(`
        DROP TABLE "part_interventions_intervention"
    `);
  }
}
