import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':uuid')
  async createRoomSeats(@Param('uuid') uuid: string) {
    return await this.roomService.createSeats(uuid);
  }
}
