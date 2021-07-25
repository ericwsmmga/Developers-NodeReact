import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateDevelopers1624826124376 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'developers',
            columns: [
               {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
               },
               {
                  name: 'name',
                  type: 'varchar',
               },
               {
                  name: 'email',
                  type: 'varchar',
               },
               {
                  name: 'sex',
                  type: 'varchar(2)',
               },
               {
                  name: 'age',
                  type: 'integer',
               },
               {
                  name: 'hobby',
                  type: 'varchar',
               },
               {
                  name: 'birthDate',
                  type: 'date',
               },
               {
                  name: 'created_at',
                  type: 'timestamp with time zone',
                  default: 'now()',
               },
               {
                  name: 'updated_at',
                  type: 'timestamp with time zone',
                  default: 'now()',
               },
               {
                  name: 'deleted_at',
                  type: 'timestamp with time zone',
                  isNullable: true,
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('developers');
      await queryRunner.dropIndex('developers', 'IDX_PK');
   }
}
