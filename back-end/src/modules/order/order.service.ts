import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../typeorm';
import { Repository } from 'typeorm';
import { PaywallService } from '../paywall/paywall.service';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { RoomService } from '../room/room.service';
import { TimestampService } from '../timestamp/timestamp.service';
import { OrderStatus } from '../../typeorm/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => PaywallService))
    private readonly paywallService: PaywallService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly timestampService: TimestampService,
  ) {}

  async getOrder(uuid: string) {
    const order = await this.orderRepository.findOne({
      where: { uuid },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async createOrder(body: CreateOrderDto) {
    const timestamp = await this.timestampService.getTimestamp(
      body.timestampUuid,
    );

    const available = await this.roomService.checkAvailability(
      timestamp.room.uuid,
      body.seatUuids,
    );

    if (!available) {
      throw new BadRequestException('Some seats are not available');
    }

    const seats = await this.roomService.getSeats(body.seatUuids);

    const user = await this.userService.createUser(body.email);

    const price = seats.length * timestamp.price;

    const payment = await this.paywallService.createPayment(timestamp, price);

    const order = await this.orderRepository.create({
      user,
      timestamp,
      seats,
      price,
      stripeId: payment.id,
      status: OrderStatus.PENDING,
    });

    await this.orderRepository.save(order);

    return payment.url;
  }

  async updateOrder(id: string, type: string) {
    switch (type) {
    }
  }
}
