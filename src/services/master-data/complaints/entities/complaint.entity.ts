import { ApiProperty } from '@nestjs/swagger';
import { Complaint } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { GreenPlaceEntity } from '../../green-places/entities/green-place.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class ComplaintEntity implements Complaint {
  @ApiProperty()
  id: number;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Exclude()
  greenPlaceId: number;

  @ApiProperty()
  greenPlace?: GreenPlaceEntity;

  @ApiProperty()
  @Exclude()
  userId: number;

  @ApiProperty()
  user?: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<ComplaintEntity>) {
    Object.assign(this, partial);

    if (partial.greenPlace) {
      this.greenPlace = new GreenPlaceEntity(partial.greenPlace);
    }

    if (partial.user) {
      this.user = new UserEntity(partial.user);
    }
  }
}
