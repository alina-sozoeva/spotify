import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGenderColumnEnum1735748305631 implements MigrationInterface {
    name = 'UpdateGenderColumnEnum1735748305631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT 'male'`);
    }

}
