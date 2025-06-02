import { Global, Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Global()
@Injectable()
export class DatabaseService {
  public users: User[];
  public tracks: Track[];

  constructor() {
    this.users = [];
    this.tracks = [];
  }
}
