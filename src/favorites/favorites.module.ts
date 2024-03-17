import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from './entities/favorite.entity';
import { ArtistsRepository } from '../artists/artists.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    TypeOrmModule.forFeature([Album, Artist, Track, FavoriteTrack, FavoriteAlbum, FavoriteArtist]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumsRepository, ArtistsRepository, TracksRepository],
})
export class FavoritesModule {}
