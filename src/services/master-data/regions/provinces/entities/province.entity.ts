import { ApiProperty } from '@nestjs/swagger';
import { Province } from '@prisma/client';

export class ProvinceEntity implements Province {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<ProvinceEntity>) {
    Object.assign(this, partial);
  }
}
