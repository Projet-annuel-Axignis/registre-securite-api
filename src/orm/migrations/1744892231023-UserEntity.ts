import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1744892231023 implements MigrationInterface {
  name = 'UserEntity1744892231023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ADMINISTRATOR', 'READ_ONLY')
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "api_key" character varying NOT NULL,
                "role" "public"."user_role_enum" NOT NULL,
                CONSTRAINT "UQ_3fe76ecf0f0ef036ff981e9f67d" UNIQUE ("name"),
                CONSTRAINT "UQ_3b744a9255b6d44539764100778" UNIQUE ("api_key"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
  }
}
