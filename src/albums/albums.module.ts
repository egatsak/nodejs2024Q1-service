import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './albums.repository';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [forwardRef(() => ArtistsModule), forwardRef(() => TracksModule), TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
