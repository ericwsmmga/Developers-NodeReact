import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateErrorLog1625590136024 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'logErrors',
            columns: [
               {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
               },
               {
                  name: 'message',
                  type: 'varchar',
               },
               {
                  name: 'stack',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'errorLocation',
                  type: 'varchar',
               },
               {
                  name: 'statusCode',
                  type: 'integer',
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
      await queryRunner.dropTable('logErrors');
   }
}
