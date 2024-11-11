import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @ValidateIf((o, value) => value !== undefined && value !== null)
  artistId: string | null;

  @IsUUID()
  @ValidateIf((o, value) => value !== undefined && value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
