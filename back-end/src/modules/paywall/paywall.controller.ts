import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaywallService } from './paywall.service';

@Controller('paywall')
@ApiTags('Paywall')
export class PaywallController {
  constructor(private readonly paywallService: PaywallService) {}

  @Get()
  async createPayment() {
    return await this.paywallService.createPayment();
  }
}
