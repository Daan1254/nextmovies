import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get(':uuid')
  async getOrder(@Param('uuid') uuid: string) {
    return await this.orderService.getOrder(uuid);
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }
}
