import { Global, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Global()
@Injectable()
export class DatabaseService {
  public users: User[];

  constructor() {
    this.users = [];
  }
}
