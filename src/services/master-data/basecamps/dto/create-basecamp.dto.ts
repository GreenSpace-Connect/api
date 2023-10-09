import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBasecampDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  communityId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  greenPlaceId: number;
}
