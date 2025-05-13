/*
  Warnings:

  - Made the column `userId` on table `Bet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_userId_fkey";

-- AlterTable
ALTER TABLE "Bet" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
