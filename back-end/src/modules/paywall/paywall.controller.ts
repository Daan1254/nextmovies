import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { PaywallService } from './paywall.service';
import { StripeWebhookBody } from './dto/stripe-body.dto';

@Controller('paywall')
@ApiTags('Paywall')
export class PaywallController {
  constructor(private readonly paywallService: PaywallService) {}

  @Get()
  async createPayment() {
    // return await this.paywallService.createPayment();
  }

  @ApiExcludeEndpoint()
  @Post('webhook')
  async handleStripeWebhook(@Body() body: StripeWebhookBody) {
    await this.paywallService.handleStripeWebhook(body);
    return 'ok';
  }
}
