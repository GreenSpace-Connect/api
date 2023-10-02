import { ApiProperty } from '@nestjs/swagger';
import { District } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CityEntity } from '../../cities/entities/city.entity';

export class DistrictEntity implements District {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Exclude()
  cityId: number;

  @ApiProperty()
  city: CityEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<DistrictEntity>) {
    Object.assign(this, partial);

    if (partial.city) {
      this.city = new CityEntity(partial.city);
    }
  }
}
