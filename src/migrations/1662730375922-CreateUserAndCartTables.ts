import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndCartTables1662730375922
  implements MigrationInterface
{
  name = 'CreateUserAndCartTables1662730375922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
                                 \`id\` INT NOT NULL AUTO_INCREMENT,
                                 \`name\` VARCHAR(255) NOT NULL,
                                 \`email\` VARCHAR(255) NOT NULL,
                                 \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 \`phone_number\` VARCHAR(255) NOT NULL,
                                 \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 UNIQUE INDEX \`UQ_user_email\` (\`email\`),
                                 PRIMARY KEY (\`id\`)
       ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`currency\` ENUM('UAH', 'USD', 'EUR') NOT NULL,
        \`balance\` INT NOT NULL CHECK (\`balance\` > 0),
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`user_id\` INT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_cart_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_cart_user\``,
    );
    await queryRunner.query(`DROP TABLE \`cart\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
