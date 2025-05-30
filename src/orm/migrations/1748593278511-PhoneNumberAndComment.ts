import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhoneNumberAndComment1748593278511 implements MigrationInterface {
  name = 'PhoneNumberAndComment1748593278511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "plan"
            ADD "comment" text
        `);
    await queryRunner.query(`
            ALTER TABLE "company"
            ADD "siret_number" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "company"
            ADD CONSTRAINT "UQ_16a525330422b8161117579fd32" UNIQUE ("siret_number")
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "phone_number" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "phone_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "company" DROP CONSTRAINT "UQ_16a525330422b8161117579fd32"
        `);
    await queryRunner.query(`
            ALTER TABLE "company" DROP COLUMN "siret_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "plan" DROP COLUMN "comment"
        `);
  }
}
