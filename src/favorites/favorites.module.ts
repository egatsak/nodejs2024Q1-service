import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from './entities/favorite.entity';
import { FavoriteAlbumsRepository, FavoriteArtistsRepository, FavoriteTracksRepository } from './favorites.repository';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    TypeOrmModule.forFeature([FavoriteTrack, FavoriteAlbum, FavoriteArtist]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteArtistsRepository, FavoriteAlbumsRepository, FavoriteTracksRepository],
})
export class FavoritesModule {}
