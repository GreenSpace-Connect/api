import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CommunityEntity } from 'src/services/master-data/communities/entities/community.entity';
import { CityEntity } from 'src/services/master-data/regions/cities/entities/city.entity';
import { DistrictEntity } from 'src/services/master-data/regions/districts/entities/district.entity';
import { ProvinceEntity } from 'src/services/master-data/regions/provinces/entities/province.entity';

export class EventEntity implements Event {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  @Exclude()
  communityId: number;

  @ApiProperty()
  community?: CommunityEntity;

  @ApiProperty()
  @Exclude()
  provinceId: number;

  @ApiProperty()
  province?: ProvinceEntity;

  @ApiProperty()
  @Exclude()
  cityId: number;

  @ApiProperty()
  city?: CityEntity;

  @ApiProperty()
  @Exclude()
  districtId: number;

  @ApiProperty()
  district?: DistrictEntity;

  @ApiProperty()
  placeName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  schedule: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);

    if (partial.community) {
      this.community = new CommunityEntity(partial.community);
    }

    if (partial.province) {
      this.province = new ProvinceEntity(partial.province);
    }

    if (partial.city) {
      this.city = new CityEntity(partial.city);
    }

    if (partial.district) {
      this.district = new DistrictEntity(partial.district);
    }
  }
}
