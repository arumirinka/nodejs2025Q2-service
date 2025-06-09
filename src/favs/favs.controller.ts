import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { validate } from 'uuid';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('album/:id')
  addAlbum(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new BadRequestException('Invalid album id.');
    }
    const res = this.favsService.addAlbum(id);
    if (!res) {
      throw new UnprocessableEntityException(
        'Album with this id does not exist.',
      );
    }

    return 'Album added to favorites.';
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id.');
    }
    const res = this.favsService.addArtist(id);
    if (!res) {
      throw new UnprocessableEntityException(
        'Artist with this id does not exist.',
      );
    }

    return 'Artist added to favorites.';
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id.');
    }
    const res = this.favsService.addTrack(id);
    if (!res) {
      throw new UnprocessableEntityException(
        'Track with this id does not exist.',
      );
    }

    return 'Track added to favorites.';
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid album id.');
    }
    const res = this.favsService.removeAlbum(id);
    if (!res) {
      throw new NotFoundException('Album with this id is not in favorites.');
    }

    return 'Album removed from favorites.';
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id.');
    }
    const res = this.favsService.removeArtist(id);
    if (!res) {
      throw new NotFoundException('Artist with this id is not in favorites.');
    }

    return 'Artist removed from favorites.';
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id.');
    }
    const res = this.favsService.removeTrack(id);
    if (!res) {
      throw new NotFoundException('Track with this id is not in favorites.');
    }

    return 'Track removed from favorites.';
  }
}
