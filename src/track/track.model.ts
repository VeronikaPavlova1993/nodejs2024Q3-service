export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
