import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }
  @Get(':id')
  getOneArtist(@Param('id') id: string) {
    return this.artistService.getOneArtist(id);
  }
  @Patch(':id')
  updateArtist(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }
  @Delete(':id')
  removeArtist(@Param('id') id: string) {
    return this.artistService.removeArtist(id);
  }
}
