import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from './entities/favorite.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class FavoriteArtistsRepository extends BaseRepository<FavoriteArtist> {
  constructor(
    @InjectRepository(FavoriteArtist) private readonly favoriteArtistsRepository: Repository<FavoriteArtist>,
  ) {
    super(favoriteArtistsRepository);
  }
}

@Injectable()
export class FavoriteAlbumsRepository extends BaseRepository<FavoriteAlbum> {
  constructor(@InjectRepository(FavoriteAlbum) private readonly favoriteTracksRepository: Repository<FavoriteAlbum>) {
    super(favoriteTracksRepository);
  }
}

@Injectable()
export class FavoriteTracksRepository extends BaseRepository<FavoriteTrack> {
  constructor(@InjectRepository(FavoriteTrack) private readonly favoriteTracksRepository: Repository<FavoriteTrack>) {
    super(favoriteTracksRepository);
  }
}
