import { PartialType } from '@nestjs/swagger';
import { CreateTicketTransactionDto } from './create-ticket-transaction.dto';

export class UpdateTicketTransactionDto extends PartialType(CreateTicketTransactionDto) {}
