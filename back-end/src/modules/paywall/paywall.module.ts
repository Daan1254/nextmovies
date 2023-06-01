import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import * as process from 'process';
import { PaywallController } from './paywall.controller';
import { PaywallService } from './paywall.service';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    }),
  ],
  controllers: [PaywallController],
  providers: [PaywallService],
  exports: [],
})
export class PaywallModule {}
