import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './track/track.module';
import { AlbumsModule } from './album/album.module';
import { UsersModule } from './users/users.module';
import { FavsModule } from './favorites/favs.module';

@Module({
  imports: [UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavsModule,],
  controllers: [AppController],
  providers: [AppService],





})
export class AppModule {}
