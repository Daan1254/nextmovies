import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Settings } from '../../typeorm';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([Settings]), MovieModule],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [],
})
export class SettingsModule {}
