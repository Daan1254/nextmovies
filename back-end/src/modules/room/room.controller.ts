import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':uuid')
  async createRoomSeats(@Param('uuid') uuid: string) {
    return await this.roomService.createSeats(uuid);
  }
}
