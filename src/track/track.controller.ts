import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('track')
@ApiTags('Tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  getOneTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.getOneTrack(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiNoContentResponse({ description: 'The track has been deleted' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.removeTrack(id);
  }
}
