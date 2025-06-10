import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const id = v4();
    const newArtist = {
      ...createArtistDto,
      id,
    };
    this.database.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.database.artists;
  }

  findOne(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (
      !id ||
      !updateArtistDto.name ||
      !updateArtistDto.hasOwnProperty('grammy')
    )
      throw new BadRequestException('Invalid input');
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  remove(id: string) {
    const artistIndex = this.database.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex < 0) throw new NotFoundException('Artist not found');
    this.database.artists.splice(artistIndex, 1);
    this.database.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    this.database.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
    const idInFavs = this.database.favs.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (idInFavs > -1) {
      this.database.favs.artists.splice(idInFavs, 1);
    }
  }
}
