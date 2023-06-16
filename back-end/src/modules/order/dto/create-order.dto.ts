import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  timestampUuid: string;

  @ApiProperty({
    isArray: true,
  })
  seatUuids: string[];
}
