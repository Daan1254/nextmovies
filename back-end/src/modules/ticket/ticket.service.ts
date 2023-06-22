import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { Order, Ticket } from '../../typeorm';
import { Logger } from '@nestjs/common/services/logger.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AxiosResponse } from 'axios';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class TicketService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async generateTickets(order: Order) {
    order.seats.map((seat) => {
      this.http
        .post(
          'https://api.placid.app/api/rest/pdfs',
          JSON.stringify({
            pages: [
              {
                template_uuid: 'q2ldqbhbc',
                layers: {
                  img: {
                    media: order.timestamp.movie.thumbnail,
                  },
                  barcode: {
                    value: '123',
                  },
                  seat: {
                    text: '12',
                  },
                  date: {
                    text: '421',
                  },
                  title: {
                    text: 'Star wurs',
                  },
                },
              },
            ],
          }),
          {
            headers: {
              Authorization: `Bearer ${process.env.PLACID_API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          }),
        )
        .subscribe(async (response: AxiosResponse) => {
          const ticket = this.ticketRepository.create({
            order,
            placidId: response.data.id,
          });

          await this.ticketRepository.save(ticket);

          Logger.log(`Generated ticket for order ${order.uuid}`);
        });
    });
  }

  async refreshTicketUrl(ticket: Ticket) {
    try {
      const response = await this.http
        .get(`https://api.placid.app/api/rest/pdfs/${ticket.placidId}`, {
          headers: {
            Authorization: `Bearer ${process.env.PLACID_API_KEY}`,
          },
        })
        .toPromise();

      if (response.status !== 200) {
        throw new BadRequestException('Failed to refresh ticket');
      }

      ticket.url = response.data.pdf_url;
      await this.ticketRepository.save(ticket);

      return ticket;
    } catch (e) {
      Logger.error(e);
    }
  }
}
