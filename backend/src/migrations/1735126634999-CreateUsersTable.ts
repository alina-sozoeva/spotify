import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1735126634999 implements MigrationInterface {
  name = 'CreateUsersTable1735126634999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, "isEmailConfirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
