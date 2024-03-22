import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class ArtistsRepository extends BaseRepository<Artist> {
  constructor(@InjectRepository(Artist) private readonly artistRepository: Repository<Artist>) {
    super(artistRepository);
  }
}
