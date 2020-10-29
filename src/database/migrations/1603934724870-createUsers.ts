import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1603934724870 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'role',
          type: 'string',
        },
        {
          name: 'password',
          type: 'string',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
