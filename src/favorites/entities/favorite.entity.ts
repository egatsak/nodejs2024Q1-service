import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { Track } from 'src/tracks/entities/tracks.entity';

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class Favorites implements IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
