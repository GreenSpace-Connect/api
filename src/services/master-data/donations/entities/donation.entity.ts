import { ApiProperty } from '@nestjs/swagger';
import { Donation } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { EventEntity } from '../../events/entities/event.entity';
import { DonationTransactionEntity } from '../../donation-transactions/entities/donation-transaction.entity';

export class DonationEntity implements Donation {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  expectDonation: number;

  @ApiProperty()
  @Exclude()
  eventId: number;

  @ApiProperty()
  event?: EventEntity;

  @ApiProperty()
  donationTransaction?: DonationTransactionEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<DonationEntity>) {
    Object.assign(this, partial);

    if (partial.event) {
      this.event = new EventEntity(partial.event);
    }

    if (partial.donationTransaction) {
      this.donationTransaction = partial.donationTransaction.map(
        (item) => new DonationTransactionEntity(item),
      );
    }
  }
}
