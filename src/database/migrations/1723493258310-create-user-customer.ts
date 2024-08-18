import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserCustomer1723493258310 implements MigrationInterface {
    name = 'createUserCustomer1723493258310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "customer_id_seq"`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e"`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_2b5187e7475dcc88f25bec39672"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_2b5187e7475dcc88f25bec39672" UNIQUE ("lastName")`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name")`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."name" IS NULL`);
        await queryRunner.query(`CREATE SEQUENCE "customer_id_seq" OWNED BY "customer"."id"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT nextval('customer_id_seq')`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
