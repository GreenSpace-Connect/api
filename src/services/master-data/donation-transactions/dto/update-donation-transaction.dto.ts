import { PartialType } from '@nestjs/swagger';
import { CreateDonationTransactionDto } from './create-donation-transaction.dto';

export class UpdateDonationTransactionDto extends PartialType(CreateDonationTransactionDto) {}
