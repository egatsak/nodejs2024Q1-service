import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    // TODO refactor to promise all ?
    const artist = await this.artistsRepository.findOne({
      where: {
        id: createTrackDto.artistId,
      },
    });

    if (!artist && createTrackDto.artistId !== null) {
      throw new NotFoundException(`Artist not found`);
    }

    const album = await this.albumsRepository.findOne({
      where: {
        id: createTrackDto.albumId,
      },
    });

    if (!album && createTrackDto.albumId !== null) {
      throw new NotFoundException(`Album not found`);
    }

    const track = this.tracksRepository.create(createTrackDto);

    return await this.tracksRepository.save(track);
  }

  async findAll() {
    return await this.tracksRepository.findAll();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOneById(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.preload({ id });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    if (updateTrackDto.artistId !== null) {
      const artist = await this.artistsRepository.findOne({
        where: {
          id: updateTrackDto.artistId,
        },
      });
      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (updateTrackDto.albumId !== null) {
      const album = await this.albumsRepository.findOne({
        where: {
          id: updateTrackDto.artistId,
        },
      });

      if (!album) {
        throw new NotFoundException();
      }
    }

    const updatedTrack = await this.tracksRepository.save({ ...track, ...updateTrackDto });

    return updatedTrack;
  }

  async remove(id: string) {
    const result = await this.tracksRepository.deleteById(id);
    if (result === 0) {
      throw new NotFoundException();
    }
  }
}
