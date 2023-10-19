import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../../users/entities/user.entity';
import { EventEntity } from '../../events/entities/event.entity';

export class CommentEntity implements Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  @Exclude()
  userId: number;

  @ApiProperty()
  user?: UserEntity;

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

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);

    if (partial.user) {
      this.user = new UserEntity(partial.user);
    }

    if (partial.event) {
      this.event = new EventEntity(partial.event);
    }
  }
}
