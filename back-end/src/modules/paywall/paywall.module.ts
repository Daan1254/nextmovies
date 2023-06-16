import { forwardRef, Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import * as process from 'process';
import { PaywallService } from './paywall.service';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
      typescript: true,
    }),
    forwardRef(() => OrderModule),
  ],
  controllers: [],
  providers: [PaywallService],
  exports: [PaywallService],
})
export class PaywallModule {}
