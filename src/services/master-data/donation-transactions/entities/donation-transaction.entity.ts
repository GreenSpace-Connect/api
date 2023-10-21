import { ApiProperty } from '@nestjs/swagger';
import { DonationTransaction } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { DonationEntity } from '../../donations/entities/donation.entity';
import { Exclude } from 'class-transformer';

export class DonationTransactionEntity implements DonationTransaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Exclude()
  donationId: number;

  @ApiProperty()
  donation?: DonationEntity;

  @ApiProperty()
  @Exclude()
  userId: number;

  @ApiProperty()
  user?: UserEntity;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<DonationTransactionEntity>) {
    Object.assign(this, partial);

    if (this.donation) {
      this.donation = new DonationEntity(partial.donation);
    }

    if (this.user) {
      this.user = new UserEntity(partial.user);
    }
  }
}
