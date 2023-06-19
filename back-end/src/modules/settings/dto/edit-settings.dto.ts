import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class EditSettingsDto {
  @ApiProperty()
  featuredMovieUuid: string;
}
