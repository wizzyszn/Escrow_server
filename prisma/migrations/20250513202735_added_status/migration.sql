-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'resolved', 'failed');

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
