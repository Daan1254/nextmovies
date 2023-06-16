import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':uuid')
  async getMovie(@Param('uuid') uuid: string) {
    return await this.movieService.getMovie(uuid);
  }

  @Get()
  async getAllMovies() {
    return await this.movieService.getMovies();
  }
}
