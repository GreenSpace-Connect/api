import { PrismaClient } from '@prisma/client';
import { info } from 'console';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

type Region = {
  id: string;
  parentId: string;
  name: string;
};

export class DistirctSeeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    parse(
      fs.readFileSync(path.resolve(__dirname, '../../files/districts.csv'), {
        encoding: 'utf-8',
      }),
      {
        delimiter: ',',
        columns: ['id', 'parentId', 'name'],
      },
      (error, result) => {
        return result.forEach(async (district: Region) => {
          try {
            await this.prisma.district.upsert({
              where: { id: +district.id },
              update: {
                id: +district.id,
                cityId: +district.parentId,
                name: district.name,
              },
              create: {
                id: +district.id,
                cityId: +district.parentId,
                name: district.name,
              },
            });
            info(
              `# inserting district -- id: ${district.id}, name ${district.name}`,
            );
          } catch (error) {
            info(
              `# failed inserting district -- id: ${district.id}, name ${district.name}`,
            );
            // console.error(error);
          }
        });
      },
    );
  }
}
