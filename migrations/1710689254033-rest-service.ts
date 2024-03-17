import { MigrationInterface, QueryRunner } from "typeorm";

export class RestService1710689254033 implements MigrationInterface {
    name = 'RestService1710689254033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistIdId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistIdId" uuid, "albumIdId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artist" ("id" SERIAL NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "REL_c180f6299cca784da231265d0f" UNIQUE ("artist_id"), CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_album" ("id" SERIAL NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "REL_de49c98d95ee64924736b32e66" UNIQUE ("album_id"), CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_track" ("id" SERIAL NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "REL_742ce9682c4da13bba6baec649" UNIQUE ("track_id"), CONSTRAINT "PK_919a46033d84cebe3f7c405fe50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574" FOREIGN KEY ("artistIdId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_817e387c7bc65ab2ecb08f66d7f" FOREIGN KEY ("artistIdId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_e259e7f86606390730993b2a5a5" FOREIGN KEY ("albumIdId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "FK_c180f6299cca784da231265d0fd" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "FK_de49c98d95ee64924736b32e666" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "FK_742ce9682c4da13bba6baec6493" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "FK_742ce9682c4da13bba6baec6493"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "FK_de49c98d95ee64924736b32e666"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "FK_c180f6299cca784da231265d0fd"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_e259e7f86606390730993b2a5a5"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_817e387c7bc65ab2ecb08f66d7f"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574"`);
        await queryRunner.query(`DROP TABLE "favorite_track"`);
        await queryRunner.query(`DROP TABLE "favorite_album"`);
        await queryRunner.query(`DROP TABLE "favorite_artist"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
