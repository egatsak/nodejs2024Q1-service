import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';

import { FavoriteAlbum, FavoriteArtist, FavoriteTrack, FavoritesResponse } from './entities/favorite.entity';
import { AlbumsRepository } from '../albums/albums.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { FavoriteAlbumsRepository, FavoriteArtistsRepository, FavoriteTracksRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    // TODO implement generic favorite repos
    private albumsRepository: AlbumsRepository,
    private tracksRepository: TracksRepository,
    private artistsRepository: ArtistsRepository,

    private favoriteTracksRepository: FavoriteTracksRepository,
    private favoriteAlbumsRepository: FavoriteAlbumsRepository,
    private favoriteArtistsRepository: FavoriteArtistsRepository,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const [favAlbums, favArtists, favTracks] = await Promise.all([
      this.favoriteAlbumsRepository.find({
        relations: ['album'],
      }),
      this.favoriteArtistsRepository.find({
        relations: ['artist'],
      }),
      this.favoriteTracksRepository.find({ relations: ['track'] }),
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

    const favArtist = await this.favoriteArtistsRepository.exists({
      where: { artistId: id },
    });

    if (favArtist) {
      throw new UnprocessableEntityException(`This artist was added to the favorites earlier!`);
    }

    return await this.favoriteArtistsRepository.save(new FavoriteArtist(artist.id));
  }

  async removeArtist(id: string) {
    const artist = await this.artistsRepository.findOneById(id);

    if (!artist) throw new NotFoundException(`Artist not found!`);

    const favArtist = await this.favoriteArtistsRepository.findOneBy({
      artist: { id },
    });

    if (!favArtist) {
      throw new UnprocessableEntityException(`This artist is not in the favorites list!`);
    }

    await this.favoriteArtistsRepository.delete({ artist: { id } });
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOneById(id);

    if (!album) throw new UnprocessableEntityException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumsRepository.exists({
      where: { albumId: id },
    });

    if (favAlbum) {
      throw new UnprocessableEntityException(`This album was added to favorites earlier!`);
    }

    return await this.favoriteAlbumsRepository.save(new FavoriteAlbum(album.id));
  }

  async removeAlbum(id: string) {
    const album = await this.albumsRepository.findOneById(id);

    if (!album) throw new NotFoundException(`Album not found!`);

    const favAlbum = await this.favoriteAlbumsRepository.findOneBy({
      album: { id },
    });

    if (!favAlbum) {
      throw new UnprocessableEntityException(`This album is not in the favorites list!`);
    }

    await this.favoriteAlbumsRepository.delete({ album: { id } });
  }

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOneById(id);

    if (!track) throw new UnprocessableEntityException(`Track not found!`);

    const favTrack = await this.favoriteTracksRepository.exists({
      where: { trackId: id },
    });

    if (favTrack) {
      throw new UnprocessableEntityException(`This track was added to favorites earlier!`);
    }

    return await this.favoriteTracksRepository.save(new FavoriteTrack(track.id));
  }

  async removeTrack(id: string) {
    const track = await this.tracksRepository.findOneById(id);

    if (!track) throw new NotFoundException(`Track not found!`);

    const favTrack = await this.favoriteTracksRepository.findOneBy({
      track: { id },
    });

    if (!favTrack) {
      throw new UnprocessableEntityException(`This track is not in the favorites list!`);
    }

    await this.favoriteTracksRepository.delete({ track: { id } });
  }
}
