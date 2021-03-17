import { hash } from 'src/functions';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdmin1615990993421 implements MigrationInterface {
  name = 'InsertAdmin1615990993421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPass = await hash('123456789_qQq');
    await queryRunner.query(
      `INSERT INTO "user" (name, email, password, role) VALUES ('Admin', 'admin@admin.com', '${hashPass}', 'ADMIN')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM "user" WHERE "email"="admin@admin.com"',
    );
  }
}
