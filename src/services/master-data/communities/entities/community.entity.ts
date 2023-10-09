import { ApiProperty } from '@nestjs/swagger';
import { Community } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class CommunityEntity implements Community {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Exclude()
  picId: number;

  @ApiProperty()
  pic: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<CommunityEntity>) {
    Object.assign(this, partial);

    if (partial.pic) {
      this.pic = new UserEntity(partial.pic);
    }
  }
}
