import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportAndIntervention1752171864966 implements MigrationInterface {
  name = 'ReportAndIntervention1752171864966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "observation_file" (
            "id" SERIAL NOT NULL,
            "file_id" integer NOT NULL,
            "observation_id" integer,
            CONSTRAINT "PK_a1285bcac28bbc69a6760c0a0dc" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."report_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'FINISHED')
    `);
    await queryRunner.query(`
        CREATE TABLE "observation" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "title" character varying NOT NULL,
            "reference" character varying NOT NULL,
            "location" character varying,
            "priority" smallint,
            "status" "public"."report_status_enum" NOT NULL,
            "started_at" TIMESTAMP WITH TIME ZONE,
            "ended_at" TIMESTAMP WITH TIME ZONE,
            "report_id" integer NOT NULL,
            CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."organization_type_enum" AS ENUM('OA', 'TC')
    `);
    await queryRunner.query(`
        CREATE TABLE "organization" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "type" "public"."organization_type_enum" NOT NULL,
            CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name"),
            CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "report_file" (
            "id" SERIAL NOT NULL,
            "file_id" integer NOT NULL,
            "report_id" integer,
            CONSTRAINT "PK_1ee07d7eee68a3ea0a9a73e1454" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."intervention_periodicity_enum" AS ENUM('MONTHLY', 'QUARTER', 'SEMESTER', 'ANNUAL')
    `);
    await queryRunner.query(`
        CREATE TABLE "report_type" (
            "id" SERIAL NOT NULL,
            "code" character varying NOT NULL,
            "name" character varying NOT NULL,
            "periodicity" "public"."intervention_periodicity_enum" NOT NULL,
            CONSTRAINT "UQ_2b0d6bfd15acacb52fcf8930a2d" UNIQUE ("code"),
            CONSTRAINT "PK_324366e10cf40cf2ac60c502a00" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "report" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "label" character varying NOT NULL,
            "type_id" integer NOT NULL,
            "typology_code" "public"."typology_code_enum",
            "organization_id" integer,
            "intervention_id" integer,
            CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "intervention_type" (
            "id" SERIAL NOT NULL,
            "code" character varying NOT NULL,
            "name" character varying NOT NULL,
            CONSTRAINT "PK_c1b81282f0555ae6b22063c728f" PRIMARY KEY ("id", "code")
        )
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."intervention_status_enum" AS ENUM('PLANNED', 'IN_PROGRESS', 'TERMINATED')
    `);
    await queryRunner.query(`
        CREATE TABLE "intervention" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "label" character varying NOT NULL,
            "company_name" character varying NOT NULL,
            "employee_name" character varying NOT NULL,
            "status" "public"."intervention_status_enum" NOT NULL,
            "planned_at" TIMESTAMP WITH TIME ZONE,
            "started_at" TIMESTAMP WITH TIME ZONE,
            "ended_at" TIMESTAMP WITH TIME ZONE,
            "type_id" integer NOT NULL,
            "type_code" character varying NOT NULL,
            "terminated_by_id" integer,
            CONSTRAINT "PK_b9c85e27e192205b164e5187279" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "part_observations_observation" (
            "part_id" integer NOT NULL,
            "observation_id" integer NOT NULL,
            CONSTRAINT "PK_65fcf9417cbd42ba609c263a286" PRIMARY KEY ("part_id", "observation_id")
        )
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_1fc0b762406af82a5d9bef63c4" ON "part_observations_observation" ("part_id")
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_061e7f5b0e54741a8929e9797f" ON "part_observations_observation" ("observation_id")
    `);
    await queryRunner.query(`
        CREATE TABLE "report_parts_part" (
            "report_id" integer NOT NULL,
            "part_id" integer NOT NULL,
            CONSTRAINT "PK_8ed55acbd12be55cd17d278274a" PRIMARY KEY ("report_id", "part_id")
        )
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_660303d8c378a49b9e986f0e3b" ON "report_parts_part" ("report_id")
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_dd96e9c6198115ed4b86fcd28d" ON "report_parts_part" ("part_id")
    `);
    await queryRunner.query(`
        ALTER TABLE "observation_file"
        ADD CONSTRAINT "FK_2470c8911f963944882bf6e6f09" FOREIGN KEY ("observation_id") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "observation"
        ADD CONSTRAINT "FK_ea1f635070c689c4e33cd357c08" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report_file"
        ADD CONSTRAINT "FK_81c2f33b45737d28490c6314573" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report"
        ADD CONSTRAINT "FK_324366e10cf40cf2ac60c502a00" FOREIGN KEY ("type_id") REFERENCES "report_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report"
        ADD CONSTRAINT "FK_0fe827f17df8468265524a25774" FOREIGN KEY ("typology_code") REFERENCES "typology"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report"
        ADD CONSTRAINT "FK_2ce57f6e69de6bd1b3f28a06db1" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report"
        ADD CONSTRAINT "FK_ea6e9450e1e92efa5e43d7f192e" FOREIGN KEY ("intervention_id") REFERENCES "intervention"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention"
        ADD CONSTRAINT "FK_c07748f9f5235bdb2dbf1e01d12" FOREIGN KEY ("type_id", "type_code") REFERENCES "intervention_type"("id", "code") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention"
        ADD CONSTRAINT "FK_10d499717bf1cd313fe18eae2c1" FOREIGN KEY ("terminated_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "part_observations_observation"
        ADD CONSTRAINT "FK_1fc0b762406af82a5d9bef63c44" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
        ALTER TABLE "part_observations_observation"
        ADD CONSTRAINT "FK_061e7f5b0e54741a8929e9797f2" FOREIGN KEY ("observation_id") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "report_parts_part"
        ADD CONSTRAINT "FK_660303d8c378a49b9e986f0e3bc" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
        ALTER TABLE "report_parts_part"
        ADD CONSTRAINT "FK_dd96e9c6198115ed4b86fcd28de" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "report_parts_part" DROP CONSTRAINT "FK_dd96e9c6198115ed4b86fcd28de"
    `);
    await queryRunner.query(`
        ALTER TABLE "report_parts_part" DROP CONSTRAINT "FK_660303d8c378a49b9e986f0e3bc"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_observations_observation" DROP CONSTRAINT "FK_061e7f5b0e54741a8929e9797f2"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_observations_observation" DROP CONSTRAINT "FK_1fc0b762406af82a5d9bef63c44"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention" DROP CONSTRAINT "FK_10d499717bf1cd313fe18eae2c1"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention" DROP CONSTRAINT "FK_c07748f9f5235bdb2dbf1e01d12"
    `);
    await queryRunner.query(`
        ALTER TABLE "report" DROP CONSTRAINT "FK_ea6e9450e1e92efa5e43d7f192e"
    `);
    await queryRunner.query(`
        ALTER TABLE "report" DROP CONSTRAINT "FK_2ce57f6e69de6bd1b3f28a06db1"
    `);
    await queryRunner.query(`
        ALTER TABLE "report" DROP CONSTRAINT "FK_0fe827f17df8468265524a25774"
    `);
    await queryRunner.query(`
        ALTER TABLE "report" DROP CONSTRAINT "FK_324366e10cf40cf2ac60c502a00"
    `);
    await queryRunner.query(`
        ALTER TABLE "report_file" DROP CONSTRAINT "FK_81c2f33b45737d28490c6314573"
    `);
    await queryRunner.query(`
        ALTER TABLE "observation" DROP CONSTRAINT "FK_ea1f635070c689c4e33cd357c08"
    `);
    await queryRunner.query(`
        ALTER TABLE "observation_file" DROP CONSTRAINT "FK_2470c8911f963944882bf6e6f09"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_dd96e9c6198115ed4b86fcd28d"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_660303d8c378a49b9e986f0e3b"
    `);
    await queryRunner.query(`
        DROP TABLE "report_parts_part"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_061e7f5b0e54741a8929e9797f"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_1fc0b762406af82a5d9bef63c4"
    `);
    await queryRunner.query(`
        DROP TABLE "part_observations_observation"
    `);
    await queryRunner.query(`
        DROP TABLE "intervention"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."intervention_status_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "intervention_type"
    `);
    await queryRunner.query(`
        DROP TABLE "report"
    `);
    await queryRunner.query(`
        DROP TABLE "report_type"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."intervention_periodicity_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "report_file"
    `);
    await queryRunner.query(`
        DROP TABLE "organization"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."organization_type_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "observation"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."report_status_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "observation_file"
    `);
  }
}
