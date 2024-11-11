import { Injectable } from '@nestjs/common';
import { Favs } from 'src/favorites/favs.model';
import { Album, Artist, Track, User } from 'types';

@Injectable()
export class db {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly tracks: Track[] = [];
  readonly albums: Album[] = [];
  readonly favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
