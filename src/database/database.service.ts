import { Global, Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Global()
@Injectable()
export class DatabaseService {
  public users: User[];
  public tracks: Track[];
  public artists: Artist[];
  public albums: Album[];

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
  }
}
