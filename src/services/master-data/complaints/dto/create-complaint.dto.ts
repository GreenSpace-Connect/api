import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  greenPlaceId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
