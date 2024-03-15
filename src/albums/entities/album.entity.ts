import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  // TODO check expose?
  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null;
}
