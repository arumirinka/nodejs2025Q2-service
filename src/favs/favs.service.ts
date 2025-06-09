import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  addAlbum(id: string) {
    const album = this.database.albums.find(album => album.id === id);
    if (!album) return false;
    const isInFavs = this.database.favs.albums.includes(id);
    if (!isInFavs) {
      this.database.favs.albums.push(id);
    }
    return 'Done';
  }

  addArtist(id: string) {
    const artist = this.database.artists.find(artist => artist.id === id);
    if (!artist) return false;
    const isInFavs = this.database.favs.artists.includes(id);
    if (!isInFavs) {
      this.database.favs.artists.push(id);
    }
    return 'Done';
  }

  addTrack(id: string) {
    const track = this.database.tracks.find(track => track.id === id);
    if (!track) return false;
    const isInFavs = this.database.favs.tracks.includes(id);
    if (!isInFavs) {
      this.database.favs.tracks.push(id);
    }
    return 'Done';
  }

  findAll() {
    const favs = this.database.favs;
    const albums = favs.albums.map((id) =>
      this.database.albums.find((el) => el.id === id),
    );
    const artists = favs.artists.map((id) =>
      this.database.artists.find((el) => el.id === id),
    );
    const tracks = favs.tracks.map((id) =>
      this.database.tracks.find((el) => el.id === id),
    );

    return { albums, artists, tracks };
  }

  removeAlbum(id: string) {
    const albumId = this.database.favs.albums.findIndex(albumId => albumId === id);
    if (albumId < 0) return false;
    this.database.favs.albums.splice(albumId, 1);
    return 'Done';
  }

  removeArtist(id: string) {
    const artistId = this.database.favs.artists.findIndex(artistId => artistId === id);
    if (artistId < 0) return false;
    this.database.favs.artists.splice(artistId, 1);
    return 'Done';
  }

  removeTrack(id: string) {
    const trackId = this.database.favs.tracks.findIndex(trackId => trackId === id);
    if (trackId < 0) return false;
    this.database.favs.tracks.splice(trackId, 1);
    return 'Done';
  }
}
