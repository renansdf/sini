import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from "typeorm";

export class createPassworrdsForeignKey1590711142537 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('passwords', new TableColumn({
      type: 'uuid',
      name: 'user_id',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('passwords', new TableForeignKey({
      name: 'userId',
      columnNames: ['user_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('passwords', 'userId');
  }

}
