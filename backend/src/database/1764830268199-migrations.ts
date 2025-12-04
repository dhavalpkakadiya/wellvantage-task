import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1764830268199 implements MigrationInterface {
    name = 'Migrations1764830268199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100), "phone" character varying(50), "email" character varying(255), "gender" character varying(20), "date_of_birth" date, "height" numeric(6,2), "height_unit" character varying(10) NOT NULL DEFAULT 'cm', "weight" numeric(6,2), "weight_unit" character varying(10) NOT NULL DEFAULT 'kg', "gym_id" uuid NOT NULL, "preferences" jsonb, "inquiry_date" TIMESTAMP WITH TIME ZONE, "assigned_to" character varying(150), "interest_level" character varying(50), "follow_up_status" character varying(50), "preferred_package" character varying(150), "preferred_pt_package" character varying(150), "how_they_heard" character varying(150), "customNotes" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42ebb4366d014febbcfdef39e3" ON "leads" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3eea7add0e16594dba102716c" ON "leads" ("email") `);
        await queryRunner.query(`ALTER TABLE "leads" ADD CONSTRAINT "FK_ca85f9daeb7bf2fc04c253a5ae0" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leads" DROP CONSTRAINT "FK_ca85f9daeb7bf2fc04c253a5ae0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3eea7add0e16594dba102716c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42ebb4366d014febbcfdef39e3"`);
        await queryRunner.query(`DROP TABLE "leads"`);
    }

}
