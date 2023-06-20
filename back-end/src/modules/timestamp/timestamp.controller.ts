import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { TimestampService } from './timestamp.service';
import {
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateEditTimestampDto } from './dto/create-edit-timestamp.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';

@Controller('timestamp')
@ApiTags('Timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) {}

  @Get(':uuid')
  async getTimestamp(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.timestampService.getTimestamp(uuid);
  }
  @Post()
  async createTimestamp(@Body() body: CreateEditTimestampDto) {
    return await this.timestampService.createTimestamp(body);
  }

  @Put()
  async editTimestamp(@Body() body: CreateEditTimestampDto) {
    return await this.timestampService.editTimestamp(body);
  }

  @Delete(':uuid')
  async deleteTimestamp(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.timestampService.deleteTimestamp(uuid);
  }
}
