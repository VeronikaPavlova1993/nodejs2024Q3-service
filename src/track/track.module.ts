import { Module } from "@nestjs/common";
import { TracksController } from "./track.controller";
import { TracksService } from "./track.service";
import { DbModule } from "src/db/db.module";

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    imports: [DbModule]
  })
  export class TracksModule {}