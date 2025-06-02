import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const id = v4();
    const timestamp = Date.now();
    const newUser = {
      ...createUserDto,
      id,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.database.users.push(newUser);

    const { password, ...createdUser } = newUser;
    return createdUser;
  }

  findAll() {
    return this.database.users.map(({ password, ...user }) => user);
  }

  findOne(id: string) {
    const user = this.database.users.find(user => user.id === id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!id || !updateUserDto.oldPassword || !updateUserDto.newPassword) throw new BadRequestException("Invalid input");
    const user = this.database.users.find(user => user.id === id);
    if (!user) throw new NotFoundException("User not found");
    if (user.password !== updateUserDto.oldPassword) throw new ForbiddenException("Forbidden");

    user.password = updateUserDto.password;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    const { password, ...updatedUser } = user;
    return updatedUser;
  }

  remove(id: string) {
    const userIndex = this.database.users.findIndex(user => user.id === id);
    if (userIndex < 0) throw new NotFoundException("User not found");
    this.database.users.splice(userIndex, 1);
  }
}
