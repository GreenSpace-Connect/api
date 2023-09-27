import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/services/master-data/users/entities/user.entity';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserEntity;
}
