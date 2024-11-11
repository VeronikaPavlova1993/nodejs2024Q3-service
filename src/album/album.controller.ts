import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/createAlbum.dto";
import { UpdateAlbumDto } from "./dto/updateAlbum.dto";

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }
  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }
  @Get(':id')
  getOneAlbum(@Param('id') id: string) {
    return this.albumService.getOneAlbum(id);
  }
  @Patch(':id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }
  @Delete(':id')
  removeAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(id);
  }
}