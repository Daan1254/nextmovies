import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { Repository } from 'typeorm';
import { CreateEditTimestampDto } from './dto/create-edit-timestamp.dto';
import { MovieService } from '../movie/movie.service';
import { RoomService } from '../room/room.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

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
      relations: ['movie', 'orders', 'room', 'room.seats', 'room.seats.order'],
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

  async editTimestamp(body: CreateEditTimestampDto) {
    const timestamp = await this.timestampRepository.findOne({
      where: {
        uuid: body.uuid,
      },
    });

    if (!timestamp) {
      throw new NotFoundException('Timestamp not found');
    }

    const movie = await this.movieService.getMovie(body.movieUuid);

    const room = await this.roomService.isRoomAvailable(
      body.roomUuid,
      body.startDate,
      body.endDate,
      timestamp.uuid,
    );

    timestamp.room = room;
    timestamp.startDate = body.startDate;
    timestamp.endDate = body.endDate;
    timestamp.price = body.price;
    timestamp.movie = movie;

    return await this.timestampRepository.save(timestamp);
  }

  async deleteTimestamp(uuid: string) {
    const timestamp = await this.timestampRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!timestamp) {
      throw new NotFoundException('Timestamp not found');
    }

    return await this.timestampRepository.softDelete(timestamp.uuid);
  }
}
