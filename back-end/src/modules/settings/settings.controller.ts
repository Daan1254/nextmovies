import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { SettingsService } from './settings.service';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { EditSettingsDto } from './dto/edit-settings.dto';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return await this.settingsService.getSettings();
  }

  @Post()
  async updateSettings(@Body() body: EditSettingsDto) {
    return await this.settingsService.updateSettings(body);
  }
}
