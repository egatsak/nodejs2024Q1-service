import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { TracksRepository } from './tracks.repository';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [AlbumsModule, ArtistsModule, TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService, TracksRepository],
})
export class TracksModule {}
