import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './track/track.module';
import { AlbumsModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,],
  controllers: [AppController],
  providers: [AppService],





})
export class AppModule {}
