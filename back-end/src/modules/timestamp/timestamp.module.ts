import { Module } from '@nestjs/common';
import { TimestampService } from './timestamp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { MovieModule } from '../movie/movie.module';
import { RoomModule } from '../room/room.module';
import { TimestampController } from './timestamp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Timestamp]), MovieModule, RoomModule],
  controllers: [TimestampController],
  providers: [TimestampService],
  exports: [TimestampService],
})
export class TimestampModule {}
