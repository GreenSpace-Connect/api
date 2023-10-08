import { ApiProperty } from '@nestjs/swagger';
import { CommunityUser } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { CommunityEntity } from '../../communities/entities/community.entity';

export class CommunityUserEntity implements CommunityUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  user: UserEntity;

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

  constructor(partial: Partial<CommunityUserEntity>) {
    Object.assign(this, partial);

    if (partial.user) {
      this.user = new UserEntity(partial.user);
    }

    if (partial.community) {
      this.community = new CommunityEntity(partial.community);
    }
  }
}
