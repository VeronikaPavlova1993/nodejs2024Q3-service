import { Module } from "@nestjs/common";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";
import { DbModule } from "src/db/db.module";

@Module({
    imports: [DbModule],
    controllers: [ArtistsController],
    providers: [ArtistsService],
  })
  export class ArtistsModule {}