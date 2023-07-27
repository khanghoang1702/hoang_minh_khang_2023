import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBlogCatRelation1690426859942 implements MigrationInterface {
    name = 'FixBlogCatRelation1690426859942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "UQ_8c937e1b5e2c1269689bcf1138e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_368e146b785b574f42ae9e53d5e" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "UQ_8c937e1b5e2c1269689bcf1138e" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
