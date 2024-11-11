import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistsService {
  createArtist(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }
  getAllArtists() {
    return `This action returns all artist`;
  }
  getOneArtist(id: number) {
    return `This action returns a #${id} artist`;
  }
  updateArtist(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }
  removeArtist(id: number) {
    return `This action removes a #${id} artist`;
  }
}
