import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDonationTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  donationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}
