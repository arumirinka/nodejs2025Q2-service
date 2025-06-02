import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
