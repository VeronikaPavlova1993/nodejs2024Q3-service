import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album as IAlbum } from 'types';
import { db } from 'src/db/db';
import { v4 as uuid } from 'uuid';
import { Album } from './dto/album.model';

@Injectable()
export class AlbumService {
  constructor(@Inject(db) private readonly db: db) {}

  createAlbum({ name, year, artistId }: CreateAlbumDto): IAlbum {
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    const newAlbum = new Album({
      id: uuid(),
      name,
      year,
      artistId: artistId || null,
    });

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  getAllAlbums(): IAlbum[] {
    return this.db.albums;
  }
getOneAlbum(id: string): IAlbum {
    const album = this.db.albums.find((entity) => entity.id === id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): IAlbum {
    const albumIndex = this.db.albums.findIndex((entity) => entity.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    const { artistId } = updateAlbumDto;
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    const changed = { ...this.db.albums[albumIndex], ...updateAlbumDto };
    this.db.albums.splice(albumIndex, 1, changed);
    return changed;
  }

  removeAlbum(id: string): IAlbum {
    const albumIndex = this.db.albums.findIndex((entity) => entity.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    const deleted = this.db.albums[albumIndex];
    this.db.albums.splice(albumIndex, 1);
    return deleted;
  }
}
