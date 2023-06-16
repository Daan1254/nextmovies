import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import {
  Delete,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateEditMovieDto } from './dto/create-edit-movie.dto';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':uuid')
  async getMovie(@Param('uuid') uuid: string) {
    return await this.movieService.getMovie(uuid);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createMovie(@Body() body: CreateEditMovieDto) {
    return await this.movieService.createMovie(body);
  }

  @Put(':uuid')
  @UsePipes(ValidationPipe)
  async updateMovie(
    @Body() body: CreateEditMovieDto,
    @Param('uuid') uuid: string,
  ) {
    return await this.movieService.updateMovie(body, uuid);
  }

  @Delete(':uuid')
  async deleteMovie(@Param('uuid') uuid: string) {
    return await this.movieService.deleteMovie(uuid);
  }

  @Get()
  async getAllMovies() {
    return await this.movieService.getMovies();
  }
}
