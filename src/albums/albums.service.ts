import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistsRepository.findOne({
      where: {
        id: createAlbumDto.artistId,
      },
    });

    if (!artist && createAlbumDto.artistId !== null) {
      throw new NotFoundException();
    }

    const album = this.albumsRepository.create(createAlbumDto);
    return await this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.findAll();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneById(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.preload({ id });
    if (!album) {
      throw new NotFoundException();
    }

    const artist = await this.artistsRepository.findOne({
      where: {
        id: updateAlbumDto.artistId,
      },
    });
    if (!artist) {
      throw new NotFoundException();
    }

    const updatedAlbum = await this.albumsRepository.save({ ...album, ...updateAlbumDto });

    return updatedAlbum;
  }

  async remove(id: string) {
    const result = await this.albumsRepository.deleteById(id);
    if (result === 0) {
      throw new NotFoundException(`Album with id ${id} not found!`);
    }
  }
}
