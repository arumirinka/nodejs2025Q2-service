import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const id = v4();
    const newTrack = {
      ...createTrackDto,
      id,
    };
    this.database.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.database.tracks;
  }

  findOne(id: string) {
    const track = this.database.tracks.find(track => track.id === id);
    if (!track) throw new NotFoundException("Track not found");
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!id || !updateTrackDto.name || !updateTrackDto.duration) throw new BadRequestException("Invalid input");
    const track = this.database.tracks.find(track => track.id === id);
    if (!track) throw new NotFoundException("Track not found");

    track.name = updateTrackDto.name;
    track.duration = track.duration;
    if (updateTrackDto.hasOwnProperty("albumId")) track.albumId = updateTrackDto.albumId;
    if (updateTrackDto.hasOwnProperty("artistId")) track.artistId = updateTrackDto.artistId;

    return track;
  }

  remove(id: string) {
    const trackIndex = this.database.tracks.findIndex(track => track.id === id);
    if (trackIndex < 0) throw new NotFoundException("Track not found");
    this.database.tracks.splice(trackIndex, 1);
  }
}
