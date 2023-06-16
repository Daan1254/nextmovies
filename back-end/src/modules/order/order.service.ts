import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../typeorm';
import { Repository } from 'typeorm';
import { PaywallService } from '../paywall/paywall.service';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly paywallService: PaywallService,
    private readonly userService: UserService,
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

  async createOrder(body: CreateOrderDto) {}
}
