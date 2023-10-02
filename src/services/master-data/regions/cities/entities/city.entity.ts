import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { Exclude } from 'class-transformer';

export class CityEntity implements City {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Exclude()
  provinceId: number;

  @ApiProperty()
  province: ProvinceEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<CityEntity>) {
    Object.assign(this, partial);

    if (partial.province) {
      this.province = new ProvinceEntity(partial.province);
    }
  }
}
