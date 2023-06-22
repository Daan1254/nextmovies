import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, Seat } from '../../typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { CreateEditRoomDto } from './dto/create-edit-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
  ) {}

  async checkAvailability(uuid: string, seatUuids: string[]) {
    const room = await this.roomRepository.findOne({
      where: {
        uuid,
      },
      relations: ['seats'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const seats = room.seats.filter((seat) => seatUuids.includes(seat.uuid));

    if (seats.length !== seatUuids.length) {
      throw new NotFoundException('Some seats not found');
    }

    const isAvailable = seats.every((seat) => !seat.order);

    return isAvailable;
  }

  async getSeats(seatUuids: string[]) {
    return await this.seatRepository.findByIds(seatUuids);
  }

  async createSeats(roomUuid) {
    const room = await this.roomRepository.findOne({
      where: {
        uuid: roomUuid,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const seats: Seat[] = [];
    for (let i = 0; i < room.rows; i++) {
      for (let j = 0; j < room.columns; j++) {
        seats.push(
          this.seatRepository.create({
            row: i + 1,
            column: j + 1,
            room,
          }),
        );
      }
    }

    return await this.seatRepository.save(seats);
  }

  async removeSeats(seats: Seat[]) {
    for (const seat of seats) {
      seat.order = null;
      await this.seatRepository.save(seat);
    }
  }

  async getRoom(uuid: string) {
    const room = await this.roomRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async isRoomAvailable(
    uuid: string,
    startDate: Date,
    endDate: Date,
    timestampUuid?: string,
  ) {
    const room = await this.roomRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isAvailable = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.timestamps', 'timestamp')
      .where('room.uuid = :uuid', { uuid })
      .andWhere(':endDate >= timestamp.startDate', { endDate })
      .andWhere(':startDate <= timestamp.endDate', { startDate })
      .andWhere('timestamp.uuid != :timestampUuid', { timestampUuid })
      .getCount();

    if (isAvailable !== 0) {
      throw new BadRequestException('Room not available');
    }

    return room;
  }

  async createRoom(body: CreateEditRoomDto) {
    let room = this.roomRepository.create(body);

    room = await this.roomRepository.save(room);

    if (!room) {
      throw new BadRequestException('Room not created');
    }

    const seats = await this.createSeats(room.uuid);

    room.seats = seats;

    return await this.roomRepository.save(room);
  }
}
