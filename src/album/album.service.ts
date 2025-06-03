import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const id = v4();
    const newAlbum = {
      ...createAlbumDto,
      id,
    };
    this.database.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.database.albums;
  }

  findOne(id: string) {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!id || !updateAlbumDto.name || !updateAlbumDto.year)
      throw new BadRequestException('Invalid input');
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Album not found');

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    if (updateAlbumDto.hasOwnProperty('artistId'))
      album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string) {
    const albumIndex = this.database.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex < 0) throw new NotFoundException('Album not found');
    this.database.albums.splice(albumIndex, 1);
    this.database.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}
