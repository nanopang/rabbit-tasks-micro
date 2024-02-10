import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1706082057180 implements MigrationInterface {
  name = 'Init1706082057180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`taskId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_task\` ADD CONSTRAINT \`FK_be3c9f1acbe21e0070039b5cf79\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_task\` DROP FOREIGN KEY \`FK_be3c9f1acbe21e0070039b5cf79\``,
    );
    await queryRunner.query(`DROP TABLE \`task\``);
    await queryRunner.query(`DROP TABLE \`user_task\``);
  }
}
