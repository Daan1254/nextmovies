import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateEditRoomDto {
  @ApiProperty({
    nullable: true,
  })
  uuid?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  columns: number;

  @ApiProperty()
  rows: number;
}
