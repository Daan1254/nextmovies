import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimestampService {
  constructor(
    @InjectRepository(Timestamp)
    private timestampRepository: Repository<Timestamp>,
  ) {}

  async getTimestamp(uuid: string) {
    return await this.timestampRepository.findOne({
      where: {
        uuid,
      },
      relations: ['movie', 'orders', 'room'],
    });
  }
}
