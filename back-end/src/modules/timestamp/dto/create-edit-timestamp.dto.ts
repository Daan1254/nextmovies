import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateEditTimestampDto {
  @ApiProperty({
    nullable: true,
  })
  uuid: string;

  @ApiProperty()
  movieUuid: string;

  @ApiProperty()
  roomUuid: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  endDate: Date;
}
