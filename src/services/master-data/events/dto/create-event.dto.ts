import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  communityId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  provinceId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cityId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  districtId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  placeName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schedule: string;
}
