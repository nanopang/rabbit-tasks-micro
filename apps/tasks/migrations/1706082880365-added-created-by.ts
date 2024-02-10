import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedBy1706082880365 implements MigrationInterface {
  name = 'AddedCreatedBy1706082880365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD \`createdBy\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdBy\``);
  }
}
