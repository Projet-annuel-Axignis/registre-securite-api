import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInterventionTypePrimaryKey1752581573136 implements MigrationInterface {
  name = 'UpdateInterventionTypePrimaryKey1752581573136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "intervention" DROP CONSTRAINT "FK_c07748f9f5235bdb2dbf1e01d12"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention" DROP COLUMN "type_code"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type" DROP CONSTRAINT "PK_c1b81282f0555ae6b22063c728f"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type"
        ADD CONSTRAINT "PK_0bd1fef00dd19357e5f4029b1d7" PRIMARY KEY ("id")
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type"
        ADD CONSTRAINT "UQ_7bbb8176607ad1b9b711a56a6b0" UNIQUE ("code")
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention"
        ADD CONSTRAINT "FK_0bd1fef00dd19357e5f4029b1d7" FOREIGN KEY ("type_id") REFERENCES "intervention_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "intervention" DROP CONSTRAINT "FK_0bd1fef00dd19357e5f4029b1d7"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type" DROP CONSTRAINT "UQ_7bbb8176607ad1b9b711a56a6b0"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type" DROP CONSTRAINT "PK_0bd1fef00dd19357e5f4029b1d7"
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention_type"
        ADD CONSTRAINT "PK_c1b81282f0555ae6b22063c728f" PRIMARY KEY ("id", "code")
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention"
        ADD "type_code" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "intervention"
        ADD CONSTRAINT "FK_c07748f9f5235bdb2dbf1e01d12" FOREIGN KEY ("type_id", "type_code") REFERENCES "intervention_type"("id", "code") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }
}
