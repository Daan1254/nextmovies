import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export class PaywallService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createPayment() {
    const session = await this.stripeClient.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Jason',
              },
              unit_amount: 2000,
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

    return session.url;
  }
}
