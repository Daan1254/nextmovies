import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateEditMovieDto } from './dto/create-edit-movie.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getMovie(uuid: string) {
    const movie = await this.movieRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async getMovies() {
    return await this.movieRepository.find();
  }

  async createMovie(body: CreateEditMovieDto) {
    const movie = await this.movieRepository.create({
      ...body,
    });

    if (!movie) {
      throw new BadRequestException('Movie not created');
    }

    return await this.movieRepository.save(movie);
  }

  async updateMovie(body: CreateEditMovieDto, uuid: string) {
    const movie = await this.movieRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie.title = body.title;
    movie.description = body.description;
    movie.thumbnail = body.thumbnail;
    movie.isExplicit = body.isExplicit;

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(uuid: string) {
    const movie = await this.movieRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return await this.movieRepository.softDelete(movie);
  }
}
