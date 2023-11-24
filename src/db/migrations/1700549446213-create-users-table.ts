import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1700549446213 implements MigrationInterface {
  name = 'CreateUsersTable1700549446213'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" BIGSERIAL NOT NULL,
        "email" character varying NOT NULL,
        "name" character varying NOT NULL,
        "password" character varying NOT NULL,
        "email_verified_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT "ux_users_email" UNIQUE ("email"),
        CONSTRAINT "pk_users_id" PRIMARY KEY ("id")
      )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
