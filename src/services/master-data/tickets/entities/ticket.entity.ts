import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { EventEntity } from '../../events/entities/event.entity';

export class TicketEntity implements Ticket {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @Exclude()
  eventId: number;

  @ApiProperty()
  event?: EventEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<TicketEntity>) {
    Object.assign(this, partial);

    if (partial.event) {
      this.event = new EventEntity(partial.event);
    }
  }
}
