import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async logIn(userDto: CreateUserDto) {
    if (
      !userDto ||
      !userDto.login ||
      !userDto.password ||
      typeof userDto.login !== 'string' ||
      typeof userDto.password !== 'string'
    )
      throw new BadRequestException('Invalid data');

    const user = this.database.users.find(
      (user) => user.login === userDto.login,
    );
    if (!user) throw new ForbiddenException('User not found');

    const doesPasswordMatch = await compare(userDto.password, user.password);
    if (!doesPasswordMatch) throw new ForbiddenException('User not found');

    const payload = { userId: user.id, login: user.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }

  async signUp(userDto: CreateUserDto) {
    if (
      !userDto ||
      !userDto.login ||
      !userDto.password ||
      typeof userDto.login !== 'string' ||
      typeof userDto.password !== 'string'
    )
      throw new BadRequestException('Invalid data');

    const passHash = await hash(userDto.password, +process.env.CRYPT_SALT);
    return this.userService.create({
      login: userDto.login,
      password: passHash,
    });
  }
}
