import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class createUserMigration1590617900614 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'master_password',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'Now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'Now()',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
