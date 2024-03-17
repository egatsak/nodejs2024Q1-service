import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null;
}
