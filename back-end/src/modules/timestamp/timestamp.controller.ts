import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { TimestampService } from './timestamp.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateEditTimestampDto } from './dto/create-edit-timestamp.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('timestamp')
@ApiTags('Timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) {}

  @Post()
  async createTimestamp(@Body() body: CreateEditTimestampDto) {
    return await this.timestampService.createTimestamp(body);
  }
}
