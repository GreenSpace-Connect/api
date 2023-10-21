import { ApiProperty } from '@nestjs/swagger';
import { GreenPlace } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ProvinceEntity } from '../../regions/provinces/entities/province.entity';
import { CityEntity } from '../../regions/cities/entities/city.entity';
import { DistrictEntity } from '../../regions/districts/entities/district.entity';

export class GreenPlaceEntity implements GreenPlace {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

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
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<GreenPlaceEntity>) {
    Object.assign(this, partial);

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
