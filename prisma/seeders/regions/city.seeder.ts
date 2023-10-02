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

export class CitySeeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    parse(
      fs.readFileSync(path.resolve(__dirname, '../../files/cities.csv'), {
        encoding: 'utf-8',
      }),
      {
        delimiter: ',',
        columns: ['id', 'parentId', 'name'],
      },
      (error, result) => {
        return result.forEach(async (city: Region) => {
          try {
            await this.prisma.city.upsert({
              where: { id: +city.id },
              update: {
                id: +city.id,
                provinceId: +city.parentId,
                name: city.name,
              },
              create: {
                id: +city.id,
                provinceId: +city.parentId,
                name: city.name,
              },
            });
            info(`# inserting city -- id: ${city.id}, name ${city.name}`);
          } catch (error) {
            console.error(error);
          }
        });
      },
    );
  }
}
