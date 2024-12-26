import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGenderColumn1735128414751 implements MigrationInterface {
    name = 'UpdateGenderColumn1735128414751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" TIMESTAMP NOT NULL`);
    }

}
