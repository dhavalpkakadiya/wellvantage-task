import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1764828433541 implements MigrationInterface {
    name = 'Migrations1764828433541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gyms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gymName" character varying, "ownerFirstName" character varying, "ownerLastName" character varying, "addressLine1" character varying, "addressLine2" character varying, "city" character varying, "state" character varying, "country" character varying, "phoneNumber" character varying, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_6f026d0261db062c1a1728cfbb" UNIQUE ("userId"), CONSTRAINT "PK_fe765086496cf3c8475652cddcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "googleId" character varying, "profilePic" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gyms" ADD CONSTRAINT "FK_6f026d0261db062c1a1728cfbb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gyms" DROP CONSTRAINT "FK_6f026d0261db062c1a1728cfbb5"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "gyms"`);
    }

}
