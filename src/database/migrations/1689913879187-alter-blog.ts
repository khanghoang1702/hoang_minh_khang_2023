import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBlog1689913879187 implements MigrationInterface {
    name = 'AlterBlog1689913879187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "UQ_8c937e1b5e2c1269689bcf1138e" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "UQ_8c937e1b5e2c1269689bcf1138e"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "categoryId"`);
    }

}
