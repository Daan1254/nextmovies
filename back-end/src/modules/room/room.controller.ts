import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateEditRoomDto } from './dto/create-edit-room.dto';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':uuid')
  async createRoomSeats(@Param('uuid') uuid: string) {
    return await this.roomService.createSeats(uuid);
  }

  @Post()
  async createRoom(@Body() body: CreateEditRoomDto) {
    return await this.roomService.createRoom(body);
  }
}
