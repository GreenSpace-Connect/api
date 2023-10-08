import { Module } from '@nestjs/common';
import { CommunityUserService } from './community-user.service';
import { CommunityUserController } from './community-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CommunityUserController],
  providers: [CommunityUserService],
  imports: [PrismaModule],
})
export class CommunityUserModule {}
