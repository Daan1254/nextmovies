import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { StripeWebhookBody } from './dto/stripe-body.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class PaywallService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async createPayment(timestamp: Timestamp, price: number) {
    const session = await this.stripeClient.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: timestamp.movie.title,
                images: [timestamp.movie.thumbnail],
                description: timestamp.movie.description,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
      },
      {
        apiKey: process.env.STRIPE_API_KEY,
      },
    );

    return session;
  }

  async handleStripeWebhook(body: StripeWebhookBody) {
    await this.orderService.updateOrder(body.data.object.id, body.type);
  }
}
