import { DbModule } from '../db/db.module';
import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DbModule],
})
export class FavsModule {}