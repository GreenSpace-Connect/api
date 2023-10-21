import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  ticketId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
