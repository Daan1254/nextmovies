import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaywallModule } from '../paywall/paywall.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PaywallModule, UserModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
