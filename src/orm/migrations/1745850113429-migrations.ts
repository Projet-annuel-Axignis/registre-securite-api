import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745850113429 implements MigrationInterface {
  name = 'Migrations1745850113429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "activity_log" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "external_user_id" integer,
            "request_body" character varying,
            "response_body" character varying,
            "ip_address" character varying(45),
            "headers" text,
            "method" character varying NOT NULL,
            "uri" character varying NOT NULL,
            "status_code" integer NOT NULL,
            "duration" integer NOT NULL,
            "resource_name" character varying NOT NULL,
            "resource_id" character varying,
            "description" character varying,
            "user_id" integer,
            CONSTRAINT "PK_067d761e2956b77b14e534fd6f1" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "activity_log"
        ADD CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "activity_log" DROP CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6"
    `);
    await queryRunner.query(`
        DROP TABLE "activity_log"
    `);
  }
}
