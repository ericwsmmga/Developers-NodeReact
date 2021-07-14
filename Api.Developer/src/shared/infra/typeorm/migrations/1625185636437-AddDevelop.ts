import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddDevelop1625185636437 implements MigrationInterface {
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
                  name: 'password',
                  type: 'varchar',
               },
               {
                  name: 'sex',
                  type: 'char',
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
                  name: 'birth_date',
                  type: 'timestamp with time zone',
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
      await queryRunner.dropTable('Developers');
   }
}
