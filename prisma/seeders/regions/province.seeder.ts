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

export class ProvinceSeeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    parse(
      fs.readFileSync(path.resolve(__dirname, '../../files/provinces.csv'), {
        encoding: 'utf-8',
      }),
      {
        delimiter: ',',
        columns: ['id', 'name'],
      },
      (error, result) => {
        return result.forEach(async (province: Region) => {
          try {
            await this.prisma.province.upsert({
              where: { id: +province.id },
              update: {
                id: +province.id,
                name: province.name,
              },
              create: {
                id: +province.id,
                name: province.name,
              },
            });
            info(
              `# inserting province -- id: ${province.id}, name ${province.name}`,
            );
          } catch (error) {
            console.error(error);
          }
        });
      },
    );
  }
}
