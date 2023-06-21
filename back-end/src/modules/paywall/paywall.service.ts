import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { Timestamp } from '../../typeorm/timestamp.entity';
import { StripeWebhookBody } from './dto/stripe-body.dto';
import { OrderService } from '../order/order.service';
import { Order, OrderStatus } from '../../typeorm/order.entity';

@Injectable()
export class PaywallService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async createPayment(timestamp: Timestamp, price: number, order: Order) {
    const session = await this.stripeClient.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `${order.seats.length}x ${timestamp.movie.title}`,
                images: [timestamp.movie.thumbnail],
                description: timestamp.movie.description,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONT_END_URL}/order/${order.uuid}`,
        cancel_url: `${process.env.FRONT_END_URL}/order/${order.uuid}`,
        client_reference_id: order.uuid,
      },
      {
        apiKey: process.env.STRIPE_API_KEY,
      },
    );

    return session;
  }

  async handleStripeWebhook(body: StripeWebhookBody) {
    if (body.type === 'checkout.session.completed') {
      await this.orderService.updateOrderStatus(
        OrderStatus.COMPLETED,
        body.data.object.id,
      );
      return;
    }

    await this.orderService.updateOrderStatus(
      OrderStatus.FAILED,
      body.data.object.id,
    );
  }
}
