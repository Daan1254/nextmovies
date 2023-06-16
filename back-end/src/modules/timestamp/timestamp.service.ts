import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { Repository } from 'typeorm';
import { CreateEditTimestampDto } from './dto/create-edit-timestamp.dto';
import { MovieService } from '../movie/movie.service';
import { RoomService } from '../room/room.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class TimestampService {
  constructor(
    @InjectRepository(Timestamp)
    private readonly timestampRepository: Repository<Timestamp>,
    private readonly movieService: MovieService,
    private readonly roomService: RoomService,
  ) {}

  async getTimestamp(uuid: string) {
    return await this.timestampRepository.findOne({
      where: {
        uuid,
      },
      relations: ['movie', 'orders', 'room'],
    });
  }

  async createTimestamp(body: CreateEditTimestampDto) {
    const movie = await this.movieService.getMovie(body.movieUuid);

    const room = await this.roomService.isRoomAvailable(
      body.roomUuid,
      body.startDate,
      body.endDate,
    );

    const timestamp = await this.timestampRepository.create({
      startDate: body.startDate,
      endDate: body.endDate,
      price: body.price,
      movie,
      room,
    });

    if (!timestamp) {
      throw new BadRequestException('Timestamp not created');
    }

    return await this.timestampRepository.save(timestamp);
  }
}
