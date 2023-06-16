import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  timestampUuid: string;

  @ApiProperty({
    isArray: true,
  })
  seatUuids: string[];
}
