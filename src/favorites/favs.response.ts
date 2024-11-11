import { Album, Artist, Track } from "types";

export class FavsResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(favsResponse: FavsResponse) {
    Object.assign(this, favsResponse);
  }
}