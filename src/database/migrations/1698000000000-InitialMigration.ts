import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1698000000000 implements MigrationInterface {
  name = 'InitialMigration1698000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users table
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`firstName\` varchar(255) NOT NULL,
        \`lastName\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`role\` enum ('admin', 'manager') NOT NULL DEFAULT 'manager',
        \`isActive\` tinyint NOT NULL DEFAULT 1,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_email\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Customers table
    await queryRunner.query(`
      CREATE TABLE \`customers\` (
        \`id\` varchar(36) NOT NULL,
        \`firstName\` varchar(255) NOT NULL,
        \`lastName\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`phone\` varchar(255) NOT NULL,
        \`address\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_customer_email\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Phones table
    await queryRunner.query(`
      CREATE TABLE \`phones\` (
        \`id\` varchar(36) NOT NULL,
        \`brand\` varchar(255) NOT NULL,
        \`model\` varchar(255) NOT NULL,
        \`imei\` varchar(255) NOT NULL,
        \`color\` varchar(255) NULL,
        \`notes\` text NULL,
        \`customerId\` varchar(36) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_phone_imei\` (\`imei\`),
        INDEX \`IDX_phone_customer\` (\`customerId\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Repairs table
    await queryRunner.query(`
      CREATE TABLE \`repairs\` (
        \`id\` varchar(36) NOT NULL,
        \`description\` text NOT NULL,
        \`diagnosis\` text NULL,
        \`status\` enum ('pending', 'in_progress', 'completed', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
        \`cost\` decimal(10,2) NOT NULL,
        \`estimatedCompletionDate\` date NULL,
        \`completedAt\` datetime NULL,
        \`phoneId\` varchar(36) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX \`IDX_repair_phone\` (\`phoneId\`),
        INDEX \`IDX_repair_status\` (\`status\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Foreign keys
    await queryRunner.query(`
      ALTER TABLE \`phones\` 
      ADD CONSTRAINT \`FK_phone_customer\` 
      FOREIGN KEY (\`customerId\`) 
      REFERENCES \`customers\`(\`id\`) 
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`repairs\` 
      ADD CONSTRAINT \`FK_repair_phone\` 
      FOREIGN KEY (\`phoneId\`) 
      REFERENCES \`phones\`(\`id\`) 
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`repairs\` DROP FOREIGN KEY \`FK_repair_phone\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`phones\` DROP FOREIGN KEY \`FK_phone_customer\``,
    );
    await queryRunner.query(`DROP TABLE \`repairs\``);
    await queryRunner.query(`DROP TABLE \`phones\``);
    await queryRunner.query(`DROP TABLE \`customers\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
