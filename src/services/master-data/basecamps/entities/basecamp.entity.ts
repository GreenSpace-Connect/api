import { ApiProperty } from '@nestjs/swagger';
import { Basecamp } from '@prisma/client';
import { CommunityEntity } from '../../communities/entities/community.entity';

export class BasecampEntity implements Basecamp {
  @ApiProperty()
  id: number;

  @ApiProperty()
  communityId: number;

  @ApiProperty()
  community: CommunityEntity;

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
  }
}
