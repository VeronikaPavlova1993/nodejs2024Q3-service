import { Album, Artist, Track, User } from 'types';

export class db {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly tracks: Track[] = [];
  readonly albums: Album[] = [];
}
