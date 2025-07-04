import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPartHabRelation1751646955479 implements MigrationInterface {
  name = 'FixPartHabRelation1751646955479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "part" DROP COLUMN "hab_family"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "part"
        ADD "hab_family" "public"."hab_family_name_enum" NOT NULL,
    `);
  }
}
