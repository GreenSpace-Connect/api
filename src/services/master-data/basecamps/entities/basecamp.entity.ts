import { ApiProperty } from '@nestjs/swagger';
import { Basecamp } from '@prisma/client';
import { CommunityEntity } from '../../communities/entities/community.entity';
import { GreenPlaceEntity } from '../../green-places/entities/green-place.entity';
import { Exclude } from 'class-transformer';

export class BasecampEntity implements Basecamp {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Exclude()
  communityId: number;

  @ApiProperty()
  community: CommunityEntity;

  @ApiProperty()
  @Exclude()
  greenPlaceId: number;

  @ApiProperty()
  greenPlace: GreenPlaceEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<BasecampEntity>) {
    Object.assign(this, partial);

    if (partial.community) {
      this.community = new CommunityEntity(partial.community);
    }

    if (partial.greenPlace) {
      this.greenPlace = new GreenPlaceEntity(partial.greenPlace);
    }
  }
}
