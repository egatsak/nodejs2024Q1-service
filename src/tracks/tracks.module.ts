import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { TracksRepository } from './tracks.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Track, Album, Artist]),
  ],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository, AlbumsRepository, ArtistsRepository],
  exports: [TracksService, TracksRepository],
})
export class TracksModule {}
