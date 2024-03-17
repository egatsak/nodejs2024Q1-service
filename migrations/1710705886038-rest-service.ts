import { MigrationInterface, QueryRunner } from "typeorm";

export class RestService1710705886038 implements MigrationInterface {
    name = 'RestService1710705886038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "PK_919a46033d84cebe3f7c405fe50"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "PK_919a46033d84cebe3f7c405fe50" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "PK_919a46033d84cebe3f7c405fe50"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "PK_919a46033d84cebe3f7c405fe50" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae" PRIMARY KEY ("id")`);
    }

}
