import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity()
export class FavoriteArtist {
  constructor(artistId: string | null) {
    this.artistId = artistId;
  }
  // TODO delete constructor?
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @OneToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;
}

@Entity()
export class FavoriteAlbum {
  constructor(albumId: string | null) {
    this.albumId = albumId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @OneToOne(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}

@Entity()
export class FavoriteTrack {
  constructor(trackId: string | null) {
    this.trackId = trackId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @OneToOne(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: Track;
}

export class Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
