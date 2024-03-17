import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './entities/artist.entity';

import { Album } from '../albums/entities/album.entity';
import { Favorites } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [TracksModule, AlbumsModule, TypeOrmModule.forFeature([Album, Artist, Favorites, Track])],
  controllers: [ArtistsController],
  providers: [ArtistsRepository, ArtistsService],
  exports: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}
