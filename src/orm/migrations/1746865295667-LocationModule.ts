import { ErpTypeTag } from '@src/location/types/erp-tag.types';
import { ErpTypeCode } from '@src/location/types/erp-type.types';
import { HabFamilyName } from '@src/location/types/hab-family-name.types';
import { IghClassCode } from '@src/location/types/igh-class.types';
import { TypologyCode } from '@src/location/types/typology-code.types';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocationModule1746865295667 implements MigrationInterface {
  name = 'LocationModule1746865295667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."erp_type_code_enum" AS ENUM(
                'J',
                'L',
                'M',
                'N',
                'O',
                'P',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'PA',
                'CTS',
                'SG',
                'PS',
                'GA',
                'OA',
                'EF',
                'REF'
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."erp_type_tag_enum" AS ENUM('PARTICULAR', 'SPECIAL')
        `);
    await queryRunner.query(`
            CREATE TABLE "erp_type" (
                "code" "public"."erp_type_code_enum" NOT NULL,
                "description" text NOT NULL,
                "tag" "public"."erp_type_tag_enum" NOT NULL,
                CONSTRAINT "PK_7e18a909dac12aeb03163802db5" PRIMARY KEY ("code")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."hab_family_name_enum" AS ENUM(
                'FIRST_FAMILY_SINGLE',
                'SECOND_FAMILY_SINGLE',
                'SECOND_FAMILY_COMMUNITY',
                'THIRD_FAMILY_COMMUNITY',
                'FOURTH_FAMILY_COMMUNITY',
                'RESIDENTIAL_ACCOMMODATION',
                'ELDERLY_ACCOMMODATION',
                'RESIDENTIAL_COVERED_CAR_PARK'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "hab_family" (
                "name" "public"."hab_family_name_enum" NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_fa29bcca3935d16d17abbd31b5c" PRIMARY KEY ("name")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."part_type_enum" AS ENUM('PRIVATE', 'COMMUNAL')
        `);
    await queryRunner.query(`
            CREATE TABLE "part" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "is_icpe" boolean NOT NULL DEFAULT false,
                "type" "public"."part_type_enum" NOT NULL,
                "hab_family" "public"."hab_family_name_enum" NOT NULL,
                "building_id" integer,
                "hab_family_name" "public"."hab_family_name_enum",
                "part_floor_id" integer,
                CONSTRAINT "PK_58888debdf048d2dfe459aa59da" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "part_floor" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "public_count" integer NOT NULL,
                "staff_count" integer NOT NULL,
                "exploitation_surface" double precision NOT NULL,
                "gla_surface" double precision NOT NULL,
                "public_access_surface" double precision NOT NULL,
                "building_floor_id" integer,
                CONSTRAINT "PK_97e3e062a17c5472a6fd27216cf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "lot" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "building_floor_id" integer,
                "part_floor_id" integer,
                CONSTRAINT "PK_2ba293e2165c7b93cd766c8ac9b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "building_floor" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "building_id" integer,
                CONSTRAINT "PK_79cab66f2966155a6c2b6629dfb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "erp_category" (
                "category" integer NOT NULL,
                "group" integer NOT NULL,
                "description" text NOT NULL,
                CONSTRAINT "PK_51552b8e209140c727c808651c7" PRIMARY KEY ("category")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."igh_class_code_enum" AS ENUM(
                'GHA',
                'GHO',
                'GHR',
                'GHS',
                'GHTC',
                'GHU',
                'GHW_1',
                'GHW_2',
                'GHZ',
                'ITGH'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "igh_class" (
                "code" "public"."igh_class_code_enum" NOT NULL,
                "description" text NOT NULL,
                CONSTRAINT "PK_7fed645ba486998aabb5658cbaf" PRIMARY KEY ("code")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."typology_code_enum" AS ENUM('ERP', 'IGH', 'BUP', 'HAB')
        `);
    await queryRunner.query(`
            CREATE TABLE "typology" (
                "code" "public"."typology_code_enum" NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_711309b7d17fc64bec1e067c8da" PRIMARY KEY ("code")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "building" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "site_id" integer,
                "erp_category_category" integer,
                CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "part_erp_type" (
                "part_id" integer NOT NULL,
                "erp_type_code" "public"."erp_type_code_enum" NOT NULL,
                CONSTRAINT "PK_c624edbe8578a36d6380b21c0d5" PRIMARY KEY ("part_id", "erp_type_code")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_d05c74d64edeb20e2229ed869f" ON "part_erp_type" ("part_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b08ba4466a01cdfb9fc8662629" ON "part_erp_type" ("erp_type_code")
        `);
    await queryRunner.query(`
            CREATE TABLE "building_typology" (
                "building_id" integer NOT NULL,
                "typology_code" "public"."typology_code_enum" NOT NULL,
                CONSTRAINT "PK_3d537ac813168ac4980a915c5a6" PRIMARY KEY ("building_id", "typology_code")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8209cd90c5dbfc862b3c597c79" ON "building_typology" ("building_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_81e4f5dcb365369e52f3f9190a" ON "building_typology" ("typology_code")
        `);
    await queryRunner.query(`
            CREATE TABLE "building_igh_class" (
                "building_id" integer NOT NULL,
                "igh_class_code" "public"."igh_class_code_enum" NOT NULL,
                CONSTRAINT "PK_f1074967397275521f89ea30dfc" PRIMARY KEY ("building_id", "igh_class_code")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_820bd08e5a8a8b7c8648ef773f" ON "building_igh_class" ("building_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_4102c0ead9cf1db12b6c350246" ON "building_igh_class" ("igh_class_code")
        `);
    await queryRunner.query(`
            CREATE TABLE "user_parts_part" (
                "user_id" integer NOT NULL,
                "part_id" integer NOT NULL,
                CONSTRAINT "PK_b73362484252da4c4b7eb192bd5" PRIMARY KEY ("user_id", "part_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e38069d78410c75300391477cd" ON "user_parts_part" ("user_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_5dd84c13b2bcac61996ee1bc4f" ON "user_parts_part" ("part_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "user_buildings_building" (
                "user_id" integer NOT NULL,
                "building_id" integer NOT NULL,
                CONSTRAINT "PK_1285743800336fc2b6fd4451a74" PRIMARY KEY ("user_id", "building_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_34bda7a5db9a86e01d97d32ac6" ON "user_buildings_building" ("user_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_00bb949ed7d889df412d282a53" ON "user_buildings_building" ("building_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "site" DROP CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831"
        `);
    await queryRunner.query(`
            ALTER TABLE "site"
            ALTER COLUMN "company_id"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "part"
            ADD CONSTRAINT "FK_164cacaa5bd5b4873356ffc9c92" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "part"
            ADD CONSTRAINT "FK_af3498d84441bf1fa6d431c7d3e" FOREIGN KEY ("hab_family_name") REFERENCES "hab_family"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "part"
            ADD CONSTRAINT "FK_54e4f2e182d298ecc381d230dbf" FOREIGN KEY ("part_floor_id") REFERENCES "part_floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "part_floor"
            ADD CONSTRAINT "FK_e6e3531ecf8db2cf36c4ebb285d" FOREIGN KEY ("building_floor_id") REFERENCES "building_floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "lot"
            ADD CONSTRAINT "FK_783e3e08679d71b4d85abdd8945" FOREIGN KEY ("building_floor_id") REFERENCES "building_floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "lot"
            ADD CONSTRAINT "FK_4b9bb6d3ce11b8d79543ee0c9db" FOREIGN KEY ("part_floor_id") REFERENCES "part_floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "building_floor"
            ADD CONSTRAINT "FK_f0fa521fcad1753eedc2e89e647" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "site"
            ADD CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "building"
            ADD CONSTRAINT "FK_f912f7e8b57b7999e8d4ae0588f" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "building"
            ADD CONSTRAINT "FK_892565e1adb28843b3a61ab1e05" FOREIGN KEY ("erp_category_category") REFERENCES "erp_category"("category") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "part_erp_type"
            ADD CONSTRAINT "FK_d05c74d64edeb20e2229ed869fe" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "part_erp_type"
            ADD CONSTRAINT "FK_b08ba4466a01cdfb9fc86626299" FOREIGN KEY ("erp_type_code") REFERENCES "erp_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "building_typology"
            ADD CONSTRAINT "FK_8209cd90c5dbfc862b3c597c794" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "building_typology"
            ADD CONSTRAINT "FK_81e4f5dcb365369e52f3f9190a7" FOREIGN KEY ("typology_code") REFERENCES "typology"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "building_igh_class"
            ADD CONSTRAINT "FK_820bd08e5a8a8b7c8648ef773f4" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "building_igh_class"
            ADD CONSTRAINT "FK_4102c0ead9cf1db12b6c3502467" FOREIGN KEY ("igh_class_code") REFERENCES "igh_class"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_parts_part"
            ADD CONSTRAINT "FK_e38069d78410c75300391477cda" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_parts_part"
            ADD CONSTRAINT "FK_5dd84c13b2bcac61996ee1bc4f7" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_buildings_building"
            ADD CONSTRAINT "FK_34bda7a5db9a86e01d97d32ac68" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_buildings_building"
            ADD CONSTRAINT "FK_00bb949ed7d889df412d282a535" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

    // Insert default typologies
    await queryRunner.query(`
        INSERT INTO "typology" ("code", "description") VALUES
        ('${TypologyCode.ERP}', 'Les Établissements Recevant du Public'),
        ('${TypologyCode.IGH}', 'Les Immeubles de Grande Hauteur'),
        ('${TypologyCode.BUP}', 'Les Bâtiments à Utilisation Professionnel'),
        ('${TypologyCode.HAB}', 'Les Bâtiments d’Habitation');
    `);

    // Insert default igh classes
    await queryRunner.query(`
        INSERT INTO "igh_class" ("code", "description") VALUES
        ('${IghClassCode.GHA}', 'immeubles à usage d''habitation'),
        ('${IghClassCode.GHO}', 'immeubles à usage d''hôtel'),
        ('${IghClassCode.GHR}', 'immeubles à usage d''enseignement'),
        ('${IghClassCode.GHS}', 'immeubles à usage de dépôt d''archives'),
        ('${IghClassCode.GHTC}', 'immeubles à usage de tour de contrôle'),
        ('${IghClassCode.GHU}', 'immeubles à usage sanitaire'),
        ('${IghClassCode.GHW_1}', 'immeubles à usage de bureaux répondant aux conditions fixées par le règlement prévu à l''article R. 122-4 et dont la hauteur du plancher bas tel qu''il est défini à l''article R. 146-3 est supérieure à 28 mètres et inférieure ou égale à 50 mètres'),
        ('${IghClassCode.GHW_2}', 'immeubles à usage de bureaux dont la hauteur du plancher bas tel qu''il est défini ci-dessus est supérieure à 50 mètres'),
        ('${IghClassCode.GHZ}', 'immeubles à usage principal d''habitation dont la hauteur du plancher bas est supérieure à 28 mètres et inférieure ou égale à 50 mètres et comportant des locaux autres que ceux à usage d''habitation ne répondant pas aux conditions d''indépendance fixées par les arrêtés prévus aux articles R. 142-1 et R. 146-5'),
        ('${IghClassCode.ITGH}', 'immeuble de très grande hauteur. Constitue un immeuble de très grande hauteur tout corps de bâtiment dont le plancher bas du dernier niveau est situé à plus de 200 mètres par rapport au niveau du sol le plus haut utilisable pour les engins des services publics de secours et de lutte contre l''incendie');
    `);

    // Insert default data into erp_category
    await queryRunner.query(`
        INSERT INTO "erp_category" ("category", "group", "description") VALUES
        (1, 1, 'Au-dessus de 1 500 personnes'),
        (2, 1, 'De 701 à 1 500 personnes'),
        (3, 1, 'De 301 à 700 personnes'),
        (4, 1, '300 personnes et au-dessous, à l''exception des établissements compris dans la 5ème catégorie'),
        (5, 2, 'Établissements faisant l''objet de l''article R. 143-14 dans lesquels l''effectif du public n''atteint pas le chiffre minimum fixé par le règlement de sécurité pour chaque type d''exploitation');
    `);

    // Insert default data into erp_type
    await queryRunner.query(`
        INSERT INTO "erp_type" ("code", "description", "tag") VALUES
        ('${ErpTypeCode.J}', 'Structures d''accueil pour personnes âgées et personnes handicapées', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.L}', 'Salles d''audition, de conférences, de réunions, de spectacles ou à usages multiples', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.M}', 'Magasins de vente, Centres commerciaux', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.N}', 'Restaurants et débits de boissons', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.O}', 'Hôtels et pensions de familles', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.P}', 'Salles de danse et salles de jeux', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.R}', 'Établissements d''éveil, d''enseignement, de formation, centres de vacances, centres de loisirs sans hébergement', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.S}', 'Bibliothèques, centres de documentation', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.T}', 'Salles d''expositions', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.U}', 'Établissements de soin', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.V}', 'Établissements de culte', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.W}', 'Administrations, banques, bureaux', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.X}', 'Établissements sportifs couverts', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.Y}', 'Musées', '${ErpTypeTag.PARTICULAR}'),
        ('${ErpTypeCode.PA}', 'Établissements de plein air', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.CTS}', 'Chapiteaux, tentes et structures', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.SG}', 'Structures gonflable', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.PS}', 'Parcs de stationnement couvert', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.GA}', 'Gares accessibles au public', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.OA}', 'Hôtels-restaurants d''altitude', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.EF}', 'Établissements flottants', '${ErpTypeTag.SPECIAL}'),
        ('${ErpTypeCode.REF}', 'Refuges de montagne', '${ErpTypeTag.SPECIAL}');
    `);

    // Insert default data into hab_family
    await queryRunner.query(`
        INSERT INTO "hab_family" ("name", "description") VALUES
        ('${HabFamilyName.FIRST_FAMILY_SINGLE}', '1ère famille individuelle'),
        ('${HabFamilyName.SECOND_FAMILY_SINGLE}', '2ème famille individuelle'),
        ('${HabFamilyName.SECOND_FAMILY_COMMUNITY}', '2ème famille collectif'),
        ('${HabFamilyName.THIRD_FAMILY_COMMUNITY}', '3ème famille collectif'),
        ('${HabFamilyName.FOURTH_FAMILY_COMMUNITY}', '4ème famille collectif'),
        ('${HabFamilyName.RESIDENTIAL_ACCOMMODATION}', 'Logements-foyers'),
        ('${HabFamilyName.ELDERLY_ACCOMMODATION}', 'Logements-foyers personnes âgées'),
        ('${HabFamilyName.RESIDENTIAL_COVERED_CAR_PARK}', 'Parc de Stationnement couvert Habitation (PSH)');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user_buildings_building" DROP CONSTRAINT "FK_00bb949ed7d889df412d282a535"
    `);
    await queryRunner.query(`
        ALTER TABLE "user_buildings_building" DROP CONSTRAINT "FK_34bda7a5db9a86e01d97d32ac68"
    `);
    await queryRunner.query(`
        ALTER TABLE "user_parts_part" DROP CONSTRAINT "FK_5dd84c13b2bcac61996ee1bc4f7"
    `);
    await queryRunner.query(`
        ALTER TABLE "user_parts_part" DROP CONSTRAINT "FK_e38069d78410c75300391477cda"
    `);
    await queryRunner.query(`
        ALTER TABLE "building_igh_class" DROP CONSTRAINT "FK_4102c0ead9cf1db12b6c3502467"
    `);
    await queryRunner.query(`
        ALTER TABLE "building_igh_class" DROP CONSTRAINT "FK_820bd08e5a8a8b7c8648ef773f4"
    `);
    await queryRunner.query(`
        ALTER TABLE "building_typology" DROP CONSTRAINT "FK_81e4f5dcb365369e52f3f9190a7"
    `);
    await queryRunner.query(`
        ALTER TABLE "building_typology" DROP CONSTRAINT "FK_8209cd90c5dbfc862b3c597c794"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_erp_type" DROP CONSTRAINT "FK_b08ba4466a01cdfb9fc86626299"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_erp_type" DROP CONSTRAINT "FK_d05c74d64edeb20e2229ed869fe"
    `);
    await queryRunner.query(`
        ALTER TABLE "building" DROP CONSTRAINT "FK_892565e1adb28843b3a61ab1e05"
    `);
    await queryRunner.query(`
        ALTER TABLE "building" DROP CONSTRAINT "FK_f912f7e8b57b7999e8d4ae0588f"
    `);
    await queryRunner.query(`
        ALTER TABLE "site" DROP CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831"
    `);
    await queryRunner.query(`
        ALTER TABLE "building_floor" DROP CONSTRAINT "FK_f0fa521fcad1753eedc2e89e647"
    `);
    await queryRunner.query(`
        ALTER TABLE "lot" DROP CONSTRAINT "FK_4b9bb6d3ce11b8d79543ee0c9db"
    `);
    await queryRunner.query(`
        ALTER TABLE "lot" DROP CONSTRAINT "FK_783e3e08679d71b4d85abdd8945"
    `);
    await queryRunner.query(`
        ALTER TABLE "part_floor" DROP CONSTRAINT "FK_e6e3531ecf8db2cf36c4ebb285d"
    `);
    await queryRunner.query(`
        ALTER TABLE "part" DROP CONSTRAINT "FK_54e4f2e182d298ecc381d230dbf"
    `);
    await queryRunner.query(`
        ALTER TABLE "part" DROP CONSTRAINT "FK_af3498d84441bf1fa6d431c7d3e"
    `);
    await queryRunner.query(`
        ALTER TABLE "part" DROP CONSTRAINT "FK_164cacaa5bd5b4873356ffc9c92"
    `);
    await queryRunner.query(`
        ALTER TABLE "site"
        ALTER COLUMN "company_id" DROP NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "site"
        ADD CONSTRAINT "FK_a186b0cae821e5e9c6743dd9831" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_00bb949ed7d889df412d282a53"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_34bda7a5db9a86e01d97d32ac6"
    `);
    await queryRunner.query(`
        DROP TABLE "user_buildings_building"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_5dd84c13b2bcac61996ee1bc4f"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_e38069d78410c75300391477cd"
    `);
    await queryRunner.query(`
        DROP TABLE "user_parts_part"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_4102c0ead9cf1db12b6c350246"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_820bd08e5a8a8b7c8648ef773f"
    `);
    await queryRunner.query(`
        DROP TABLE "building_igh_class"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_81e4f5dcb365369e52f3f9190a"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_8209cd90c5dbfc862b3c597c79"
    `);
    await queryRunner.query(`
        DROP TABLE "building_typology"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_b08ba4466a01cdfb9fc8662629"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_d05c74d64edeb20e2229ed869f"
    `);
    await queryRunner.query(`
        DROP TABLE "part_erp_type"
    `);
    await queryRunner.query(`
        DROP TABLE "building"
    `);
    await queryRunner.query(`
        DROP TABLE "typology"
    `);
    await queryRunner.query(`
        DROP TABLE "igh_class"
    `);
    await queryRunner.query(`
        DROP TABLE "erp_category"
    `);
    await queryRunner.query(`
        DROP TABLE "building_floor"
    `);
    await queryRunner.query(`
        DROP TABLE "lot"
    `);
    await queryRunner.query(`
        DROP TABLE "part_floor"
    `);
    await queryRunner.query(`
        DROP TABLE "part"
    `);
    await queryRunner.query(`
        DROP TABLE "hab_family"
    `);
    await queryRunner.query(`
        DROP TABLE "erp_type"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."igh_class_code_enum"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."typology_code_enum"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."erp_type_code_enum"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."hab_family_name_enum"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."part_type_enum"
    `);
    await queryRunner.query(`
        DROP TYPE "public"."erp_type_tag_enum"
    `);
  }
}
