import { ApiProperty } from '@nestjs/swagger';
import { TicketTransaction } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { TicketEntity } from '../../tickets/entities/ticket.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class TicketTransactionEntity implements TicketTransaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Exclude()
  ticketId: number;

  @ApiProperty()
  ticket: TicketEntity;

  @ApiProperty()
  @Exclude()
  userId: number;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<TicketTransactionEntity>) {
    Object.assign(this, partial);

    if (this.ticket) {
      this.ticket = new TicketEntity(partial.ticket);
    }

    if (this.user) {
      this.user = new UserEntity(partial.user);
    }
  }
}
