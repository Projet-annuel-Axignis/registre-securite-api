import { MigrationInterface, QueryRunner } from 'typeorm';

export class SiteEntity1746719313118 implements MigrationInterface {
  name = 'SiteEntity1746719313118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "site" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "name" character varying NOT NULL,
            "street_number" character varying NOT NULL,
            "street" character varying NOT NULL,
            "postal_code" integer NOT NULL,
            "city" character varying NOT NULL,
            "reference" character varying,
            "company_id" integer,
            CONSTRAINT "PK_635c0eeabda8862d5b0237b42b4" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "site"
        ADD CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "site" DROP CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831"
    `);
    await queryRunner.query(`
        DROP TABLE "site"
    `);
  }
}
