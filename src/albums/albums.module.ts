import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { Artist } from '../artists/entities/artist.entity';
import { Favorites } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Album, Artist, Favorites, Track]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, ArtistsRepository],
  exports: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
