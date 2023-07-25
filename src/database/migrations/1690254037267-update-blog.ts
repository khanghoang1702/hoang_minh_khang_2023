import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBlog1690254037267 implements MigrationInterface {
    name = 'UpdateBlog1690254037267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "content" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "title" SET NOT NULL`);
    }

}
