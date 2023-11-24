import { Migration } from '@mikro-orm/migrations'

export class Migration20240911044406 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "password_resets" ("id" bigserial primary key, "email" varchar(255) not null, "token" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    )
    this.addSql(
      'create index "password_resets_email_index" on "password_resets" ("email");',
    )

    this.addSql(
      'create table "users" ("id" bigserial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null, "email_verified_at" timestamptz null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    )
    this.addSql('create index "users_email_index" on "users" ("email");')
  }
}
