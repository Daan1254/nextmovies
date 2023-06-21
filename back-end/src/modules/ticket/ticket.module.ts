import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Ticket } from '../../typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Ticket])],
  controllers: [],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
