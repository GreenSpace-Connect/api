import { PartialType } from '@nestjs/swagger';
import { CreateCommunityUserDto } from './create-community-user.dto';

export class UpdateCommunityUserDto extends PartialType(
  CreateCommunityUserDto,
) {}
