import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1676957937984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'itens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'quote',
            type: 'text',
          },
          {
            name: 'attack',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'defense',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'weight',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('itens');
  }
}
