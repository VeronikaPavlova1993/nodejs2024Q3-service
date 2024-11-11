import { Module } from '@nestjs/common';
import { db } from './db';

@Module({
  providers: [db],
  exports: [db],
})
export class DbModule {}