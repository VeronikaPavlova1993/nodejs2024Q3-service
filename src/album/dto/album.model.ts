export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: Album) {
    Object.assign(this, album);
  }
}
