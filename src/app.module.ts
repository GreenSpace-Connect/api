import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './services/master-data/users/users.module';
import { RolesModule } from './services/master-data/roles/roles.module';
import { AuthModule } from './services/auth/auth.module';
import { CitiesModule } from './services/master-data/regions/cities/cities.module';
import { ProvincesModule } from './services/master-data/regions/provinces/provinces.module';
import { DistrictsModule } from './services/master-data/regions/districts/districts.module';
import { GreenPlacesModule } from './green-places/green-places.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ProvincesModule,
    CitiesModule,
    DistrictsModule,
    GreenPlacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
