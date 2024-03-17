import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class TracksRepository extends BaseRepository<Track> {
  constructor(@InjectRepository(Track) private readonly trackRepository: Repository<Track>) {
    super(trackRepository);
  }
}
