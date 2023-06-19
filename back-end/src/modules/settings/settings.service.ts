import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Settings } from '../../typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { EditSettingsDto } from './dto/edit-settings.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
    private readonly movieService: MovieService,
  ) {}

  async getSettings() {
    const settings = await this.settingsRepository.find();

    if (settings.length === 0) {
      settings[0] = await this.createSettings();
    }

    return settings[0];
  }

  async updateSettings(body: EditSettingsDto) {
    const settings = await this.settingsRepository.find();

    if (settings.length === 0) {
      settings[0] = await this.createSettings();
    }

    const movie = await this.movieService.getMovie(body.featuredMovieUuid);

    settings[0].featuredMovie = movie;

    return await this.settingsRepository.save(settings[0]);
  }

  private async createSettings() {
    return await this.settingsRepository.save({
      featuredMovie: null,
    });
  }
}
