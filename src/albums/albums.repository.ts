import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class AlbumsRepository extends BaseRepository<Album> {
  constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) {
    super(albumRepository);
  }
}
