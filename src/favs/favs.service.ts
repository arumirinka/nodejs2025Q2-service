import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  create(createFavDto: CreateFavDto) {
    return 'This action adds a new fav';
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

  findOne(id: string) {
    return `This action returns a #${id} fav`;
  }

  update(id: string, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: string) {
    return `This action removes a #${id} fav`;
  }
}
