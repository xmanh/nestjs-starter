import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePasswordResetsTable1700549563853
  implements MigrationInterface
{
  name = 'CreatePasswordResetsTable1700549563853'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "password_resets" (
        "id" BIGSERIAL NOT NULL,
        "email" character varying NOT NULL,
        "token" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT "pk_password_resets" PRIMARY KEY ("id")
      )`,
    )
    await queryRunner.query(
      `CREATE INDEX "ix_password_resets_email" ON "password_resets" ("email") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."ix_password_resets_email"`)
    await queryRunner.query(`DROP TABLE "password_resets"`)
  }
}
