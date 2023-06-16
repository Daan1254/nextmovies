import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BravoMailService {
  constructor(private readonly httpService: HttpService) {}

  async sendMail(email: string, subject: string, href: string) {
    const htmlContent =
      '<h1>Thanks for your order!</h1> <br/> <a href=' +
      href +
      ' style="padding: 5px; background-color: dodgerblue; color: white; border-radius: 10px">Download Tickets</a>';

    try {
      this.httpService
        .post(
          'https://api.brevo.com/v3/smtp/email',
          {
            sender: {
              name: process.env.BRAVO_SENDER_NAME,
              email: process.env.BRAVO_SENDER_EMAIL,
            },
            to: [
              {
                name: email,
                email,
              },
            ],
            subject,
            htmlContent: htmlContent,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BRAVO_API_KEY,
              accept: 'application/json',
            },
          },
        )
        .subscribe(() => {
          Logger.log('send mail to ' + email, BravoMailService.name);
        });
    } catch (e) {
      throw new BadRequestException('Bravo mail failed');
    }
  }
}
