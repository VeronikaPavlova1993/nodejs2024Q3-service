import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from 'src/db/db';
import { Track as ITrack } from 'types';
import { v4 as uuid } from 'uuid';
import { Track } from './track.model';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TracksService {
  constructor(@Inject(db) private readonly db: db) {}

  createTrack({ name, artistId, albumId, duration }: CreateTrackDto): ITrack {
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    if (albumId) {
      const album = this.db.albums.find((entity) => entity.id === albumId);
      if (!album) {
        throw new BadRequestException(
          `Album with id: ${albumId} does not exist`,
        );
      }
    }

    const newTrack = new Track({
      id: uuid(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  getAllTracks(): ITrack[] {
    return this.db.tracks;
  }

  getOneTrack(id: string): ITrack {
    const track = this.db.tracks.find((entity) => entity.id === id);
    if (!track) throw new NotFoundException(`User with id: ${id} not found`);
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): ITrack {
    const { artistId, albumId } = updateTrackDto;

    const trackIndex = this.db.tracks.findIndex((entity) => entity.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    if (albumId) {
      const album = this.db.albums.find((entity) => entity.id === albumId);
      if (!album) {
        throw new BadRequestException(
          `Album with id: ${albumId} does not exist`,
        );
      }
    }

    const changed = { ...this.db.tracks[trackIndex], ...updateTrackDto };
    this.db.tracks.splice(trackIndex, 1, changed);
    return changed;
  }

  removeTrack(id: string): ITrack {
    const trackIndex = this.db.tracks.findIndex((entity) => entity.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    const deleted = this.db.tracks[trackIndex];
    this.db.tracks.splice(trackIndex, 1);

    return deleted;
  }
}
