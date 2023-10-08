/*
  Warnings:

  - You are about to drop the `CommunityMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityMember" DROP CONSTRAINT "CommunityMember_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityMember" DROP CONSTRAINT "CommunityMember_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropTable
DROP TABLE "CommunityMember";

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "CommunityUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CommunityUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunityUser" ADD CONSTRAINT "CommunityUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityUser" ADD CONSTRAINT "CommunityUser_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
