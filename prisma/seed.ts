import { PrismaClient } from '@prisma/client';
import { UserSeeder } from './seeders/user.seeder';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await new UserSeeder().main();
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
