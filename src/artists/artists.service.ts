import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { db } from 'src/db/db';
import { Artist } from './artist.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(@Inject(db) private readonly db: db) {}
  createArtist({ name, grammy }: CreateArtistDto): Artist {
    const newArtist = new Artist({
      id: uuid(),
      name,
      grammy,
    });
    this.db.artists.push(newArtist);
    return newArtist;
  }

  getAllArtists() {
    return this.db.artists;
  }
  getOneArtist(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return artist;
  }
  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.db.artists.findIndex((entity) => entity.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const changed = { ...this.db.artists[artistIndex], ...updateArtistDto };
    this.db.artists.splice(artistIndex, 1, changed);
    return changed;
  }
  removeArtist(id: string) {
    const artistIndex = this.db.artists.findIndex((user) => user.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const deleted = this.db.artists[artistIndex];
    this.db.artists.splice(artistIndex, 1);
    return deleted;
  }
}
