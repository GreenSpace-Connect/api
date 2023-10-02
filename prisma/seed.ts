import { PrismaClient } from '@prisma/client';
import { UserSeeder } from './seeders/user.seeder';
import { ProvinceSeeder } from './seeders/regions/province.seeder';
import { CitySeeder } from './seeders/regions/city.seeder';
import { DistirctSeeder } from './seeders/regions/district.seeder';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // await new UserSeeder().main();
  // await new ProvinceSeeder().main();
  // await new CitySeeder().main();
  // await new DistirctSeeder().main();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
