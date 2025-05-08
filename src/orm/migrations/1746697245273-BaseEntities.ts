import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseEntities1746697245273 implements MigrationInterface {
  name = 'BaseEntities1746697245273';

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
        CREATE TYPE "public"."plan_type_enum" AS ENUM('SELF_MANAGE', 'ADMIN_MANAGE')
    `);
    await queryRunner.query(`
        CREATE TABLE "plan" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "type" "public"."plan_type_enum" NOT NULL DEFAULT 'SELF_MANAGE',
            "expired_at" TIMESTAMP WITH TIME ZONE NOT NULL,
            CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "company" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "name" character varying NOT NULL,
            "plan_id" integer,
            CONSTRAINT "REL_dd3d979b6c62d4e5ad3ff2fb44" UNIQUE ("plan_id"),
            CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."role_type_enum" AS ENUM(
            'ADMINISTRATOR',
            'COMPANY_ADMINISTRATOR',
            'COMPANY_MANAGER',
            'COMPANY_MEMBER',
            'VISITOR'
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "role" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "name" character varying NOT NULL,
            "type" "public"."role_type_enum" NOT NULL,
            "description" character varying NOT NULL,
            CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "user" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "first_name" character varying NOT NULL,
            "last_name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "role_id" integer,
            "company_id" integer,
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "activity_log"
        ADD CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "company"
        ADD CONSTRAINT "FK_dd3d979b6c62d4e5ad3ff2fb44a" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "user"
        ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "user"
        ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Add roles in DB
    await queryRunner.query(`
        INSERT INTO "role" ("name", "type", "description") VALUES
            ('Administrateur', 'ADMINISTRATOR', 'Administrateur possédant un accès total à l''application'),
            ('Administrateur de société', 'COMPANY_ADMINISTRATOR', 'Gestionnaire d''un compte Client'),
            ('Manager de société', 'COMPANY_MANAGER', 'Compte client possédant plus de privilèges qu''un simple client'),
            ('Simple membre', 'COMPANY_MEMBER', 'Compte client standard'),
            ('Visiteur', 'VISITOR', 'Compte en lecture seule');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"
    `);
    await queryRunner.query(`
        ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"
    `);
    await queryRunner.query(`
        ALTER TABLE "company" DROP CONSTRAINT "FK_dd3d979b6c62d4e5ad3ff2fb44a"
    `);
    await queryRunner.query(`
        ALTER TABLE "activity_log" DROP CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6"
    `);
    await queryRunner.query(`
        DROP TABLE "user"
    `);
    await queryRunner.query(`
        DROP TABLE "role"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."role_type_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "company"
    `);
    await queryRunner.query(`
        DROP TABLE "plan"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."plan_type_enum"
    `);
    await queryRunner.query(`
        DROP TABLE "activity_log"
    `);
  }
}
