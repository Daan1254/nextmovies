import { Module } from '@nestjs/common';
import { TimestampService } from './timestamp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timestamp } from '../../typeorm/timestamp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timestamp])],
  controllers: [],
  providers: [TimestampService],
  exports: [TimestampService],
})
export class TimestampModule {}
