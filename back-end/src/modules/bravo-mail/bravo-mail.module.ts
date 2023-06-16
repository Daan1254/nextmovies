import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BravoMailService } from './bravo-mail.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [BravoMailService],
  exports: [BravoMailService],
})
export class BravoMailModule {}
