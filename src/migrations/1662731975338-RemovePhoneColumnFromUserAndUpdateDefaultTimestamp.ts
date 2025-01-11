import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePhoneColumnFromUserAndUpdateDefaultTimestamp1662731975338
  implements MigrationInterface
{
  name = 'RemovePhoneColumnFromUserAndUpdateDefaultTimestamp1662731975338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`phone_number\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`created_at\` \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`updated_at\` \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`updated_at\` \`updated_at\` TIMESTAMP NOT NULL DEFAULT '2022-09-09 13:32:59.291'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`created_at\` \`created_at\` TIMESTAMP NOT NULL DEFAULT '2022-09-09 13:32:59.291'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` TIMESTAMP NOT NULL DEFAULT '2022-09-09 13:32:59.29'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` TIMESTAMP NOT NULL DEFAULT '2022-09-09 13:32:59.29'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`phone_number\` VARCHAR(255) NOT NULL`,
    );
  }
}
