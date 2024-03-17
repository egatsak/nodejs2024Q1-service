import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteAlbum, FavoriteArtist, FavoriteTrack, FavoritesResponse } from './entities/favorite.entity';
import { AlbumsRepository } from '../albums/albums.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { ArtistsRepository } from '../artists/artists.repository';

@Injectable()
export class FavoritesService {
  constructor(
    // TODO implement generic favorite repos
    private albumsRepository: AlbumsRepository,
    private tracksRepository: TracksRepository,
    private artistsRepository: ArtistsRepository,
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const [favAlbums, favArtists, favTracks] = await Promise.all([
      this.favoriteAlbumRepository.find({
        relations: ['album'],
      }),
      this.favoriteArtistRepository.find({
        relations: ['artist'],
      }),
      this.favoriteTrackRepository.find({ relations: ['track'] }),
    ]);

    return {
      artists: favArtists.map((artist) => artist.artist),
      albums: favAlbums.map((album) => album.album),
      tracks: favTracks.map((track) => track.track),
    };
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOneById(id);

    if (!artist) throw new UnprocessableEntityException(`Artist not found!`);

    const favArtist = await this.favoriteArtistRepository.exists({
      where: { artistId: id },
    });

    if (favArtist) {
      throw new UnprocessableEntityException(`This artist was added to the favorites earlier!`);
    }

    return await this.favoriteArtistRepository.save(new FavoriteArtist(artist.id));
  }

  async removeArtist(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) throw new NotFoundException(`Artist not found!`);

    const favArtist = await this.favoriteArtistRepository.findOneBy({
      artist: { id },
    });

    if (!favArtist) {
      throw new UnprocessableEntityException(`This artist is not in the favorites list!`);
    }

    await this.favoriteArtistRepository.delete({ artist: { id } });
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOneById(id);

    if (!album) throw new UnprocessableEntityException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumRepository.exists({
      where: { albumId: id },
    });

    if (favAlbum) {
      throw new UnprocessableEntityException(`This album was added to favorites earlier!`);
    }

    return await this.favoriteAlbumRepository.save(new FavoriteAlbum(album.id));
  }

  async removeAlbum(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) throw new NotFoundException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumRepository.findOne({
      where: {
        album: { id },
      },
    });

    if (!favAlbum) {
      throw new UnprocessableEntityException(`This album is not in the favorites list!`);
    }

    await this.favoriteAlbumRepository.delete({ album: { id } });
  }

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOneById(id);

    if (!track) throw new UnprocessableEntityException(`Track not found!`);

    const favTrack = await this.favoriteTrackRepository.exists({
      where: { trackId: id },
    });

    if (favTrack) {
      throw new UnprocessableEntityException(`This track was added to favorites earlier!`);
    }

    return await this.favoriteTrackRepository.save(new FavoriteTrack(track.id));
  }

  async removeTrack(id: string) {
    const track = await this.tracksRepository.findOneById(id);

    if (!track) throw new NotFoundException(`Track not found!`);

    const favTrack = await this.favoriteTrackRepository.findOneBy({
      track: { id },
    });

    if (!favTrack) {
      throw new UnprocessableEntityException(`This track is not in the favorites list!`);
    }

    await this.favoriteTrackRepository.delete({ track: { id } });
  }
}
