import { PrismaClient } from '@prisma/client';
import { info } from 'console';
import { Role } from '../../src/lib/enums/role.enum';
import { hashPassword } from '../../src/lib/helper/hash.helper';

export class UserSeeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    // seed roles
    const roles = await Promise.all([
      ...Object.values(Role).map((role) => {
        return this.prisma.role.upsert({
          where: { name: role },
          update: {
            name: role,
          },
          create: {
            name: role,
          },
        });
      }),
    ]);
    roles.forEach((role) => {
      info(`# inserting role -- id: ${role.id}, name ${role.name}`);
    });

    // seed users
    const password = await hashPassword('rahasia123');

    const adminRole = await this.prisma.role.findUnique({
      where: { name: Role.ADMIN },
    });
    const admin = await this.prisma.user.upsert({
      where: {
        email: 'admin@greenspace.com',
      },
      update: {
        email: 'admin@greenspace.com',
        fullname: 'Admin',
        password: password,
        roleId: adminRole.id,
      },
      create: {
        email: 'admin@greenspace.com',
        fullname: 'Admin',
        password: password,
        roleId: adminRole.id,
      },
    });
    info(`# inserting user -- id: ${admin.id}, name ${admin.fullname}`);

    const userRole = await this.prisma.role.findUnique({
      where: { name: Role.USER },
    });
    const user = await this.prisma.user.upsert({
      where: {
        email: 'user@greenspace.com',
      },
      update: {
        email: 'user@greenspace.com',
        fullname: 'User',
        password: password,
        roleId: userRole.id,
      },
      create: {
        email: 'user@greenspace.com',
        fullname: 'User',
        password: password,
        roleId: userRole.id,
      },
    });
    info(`# inserting user -- id: ${user.id}, name ${user.fullname}`);
  }
}
