import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '../../roles/entities/role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  @Exclude()
  roleId: number;

  @ApiProperty()
  role: RoleEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);

    if (this.role) {
      this.role = new RoleEntity(partial.role);
    }
  }
}
