import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, Seat } from '../../typeorm';
import { Repository } from 'typeorm';

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
}
