import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { StripeWebhookBody } from './dto/stripe-body.dto';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../../typeorm/order.entity';

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
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONT_END_URL}/success`,
        cancel_url: `${process.env.FRONT_END_URL}/cancel`,
      },
      {
        apiKey: process.env.STRIPE_API_KEY,
      },
    );

    return session;
  }

  async handleStripeWebhook(body: StripeWebhookBody) {
    switch (body.type) {
      case 'checkout.session.completed': {
        await this.orderService.updateOrderStatus(
          OrderStatus.COMPLETED,
          body.data.object.id,
        );
      }
      default: {
        await this.orderService.updateOrderStatus(
          OrderStatus.FAILED,
          body.data.object.id,
        );
      }
    }
  }
}
