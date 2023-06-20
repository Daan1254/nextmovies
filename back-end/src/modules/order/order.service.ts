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
import { BravoMailService } from '../bravo-mail/bravo-mail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => PaywallService))
    private readonly paywallService: PaywallService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly timestampService: TimestampService,
    private readonly bravoMailService: BravoMailService,
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

    const order = await this.orderRepository.create({
      user,
      timestamp,
      seats,
      price,
      status: OrderStatus.PENDING,
    });

    const payment = await this.paywallService.createPayment(
      timestamp,
      price,
      order,
    );

    order.stripeId = payment.id;

    await this.orderRepository.save(order);

    return {
      redirectUrl: payment.url,
    };
  }

  async updateOrderStatus(status: OrderStatus, id: string) {
    const order = await this.orderRepository.findOne({
      where: { stripeId: id },
      relations: ['user'],
    });
    order.status = status;

    if (status === OrderStatus.COMPLETED) {
      await this.bravoMailService.sendMail(
        order.user.email,
        'Thanks for your order at NextMovies',
        process.env.FRONT_END_URL + '/order/' + order.uuid,
      );
    }

    if (status === OrderStatus.FAILED) {
      return await this.orderRepository.save(order);

      await this.roomService.removeSeats(order.seats);
      return await this.orderRepository.softDelete(order.uuid);
    }
  }
}
