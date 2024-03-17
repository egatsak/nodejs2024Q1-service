import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(artist);
  }

  async getAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.preload({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    const updatedArtist = await this.artistsRepository.save({ ...artist, ...updateArtistDto });
    return updatedArtist;
  }

  async delete(id: string): Promise<void> {
    const result = await this.artistsRepository.deleteById(id);
    if (result === 0) {
      throw new NotFoundException();
    }
  }
}
