import { Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL', eager: true })
  @Transform(({ value }) => (value ? value.id : null))
  albumId: string | null;

  @Column()
  duration: number;
}
