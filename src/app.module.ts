import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './services/master-data/users/users.module';
import { RolesModule } from './services/master-data/roles/roles.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
