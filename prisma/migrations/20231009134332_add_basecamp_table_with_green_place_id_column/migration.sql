/*
  Warnings:

  - Added the required column `greenPlaceId` to the `Basecamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Basecamp" ADD COLUMN     "greenPlaceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Basecamp" ADD CONSTRAINT "Basecamp_greenPlaceId_fkey" FOREIGN KEY ("greenPlaceId") REFERENCES "GreenPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
