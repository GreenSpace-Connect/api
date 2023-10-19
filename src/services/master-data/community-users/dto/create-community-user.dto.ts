import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommunityUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  communityId: number;
}
